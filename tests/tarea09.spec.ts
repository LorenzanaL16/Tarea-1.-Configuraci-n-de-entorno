import { test as base, expect } from '@playwright/test';

type TestFixtures = {
  timer: {
    start: number;
    elapsedMs: () => number;
  };
};

type WorkerFixtures = {
  sharedCounter: {
    value: number;
  };
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  timer: async ({}, use) => {
    const start = Date.now();
    const timer = {
      start,
      elapsedMs: () => Date.now() - start,
    };

    try {
      await use(timer);
    } finally {
      console.log(`Fixture teardown real: ${timer.elapsedMs()} ms`);
    }
  },

  sharedCounter: [async ({}, use) => {
    const state = { value: 0 };
    await use(state);
  }, { scope: 'worker' }],
});

test.describe('Reto 1 - Fixture con teardown real', () => {
  test('El fixture registra tiempo y limpia al finalizar', async ({ timer }) => {
    expect(timer.start).toBeGreaterThan(0);
    expect(timer.elapsedMs()).toBeGreaterThanOrEqual(0);

    await new Promise(resolve => setTimeout(resolve, 100));
    expect(timer.elapsedMs()).toBeGreaterThanOrEqual(100);
  });
});

test.describe('Reto 2 - Fixture de alcance worker', () => {
  test.describe.configure({ mode: 'serial' });

  test('el valor persiste entre tests del mismo worker', async ({ sharedCounter }) => {
    sharedCounter.value += 1;
    expect(sharedCounter.value).toBe(1);
    console.log(`workerCounter primer test = ${sharedCounter.value}`);
  });

  test('el contador sigue incrementando en el mismo worker', async ({ sharedCounter }) => {
    expect(sharedCounter.value).toBe(1);
    sharedCounter.value += 1;
    expect(sharedCounter.value).toBe(2);
    console.log(`workerCounter segundo test = ${sharedCounter.value}`);
  });
});

const viewports = [
  { name: 'mobile', viewport: { width: 390, height: 844 } },
  { name: 'desktop', viewport: { width: 1280, height: 800 } },
];

for (const config of viewports) {
  test.describe(`Reto 3 - test.use + parametrización (${config.name})`, () => {
    test.use({ viewport: config.viewport });

    test('el mismo test se ejecuta en ambos tamaños de pantalla', async ({ page }) => {
      await page.goto('https://www.saucedemo.com');

      await expect(page.locator('#login-button')).toBeVisible();
      await expect(page.locator('#user-name')).toBeVisible();
      await expect(page.locator('#password')).toBeVisible();

      const size = page.viewportSize();
      expect(size).not.toBeNull();
      expect(size?.width).toBe(config.viewport.width);
      expect(size?.height).toBe(config.viewport.height);
    });
  });
}
