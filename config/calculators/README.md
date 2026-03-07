# Calculator Config

Config-driven structure for marketplace calculator pages. Add new calculators (e.g. Amazon, eBay) by creating a config file and registering it.

## Structure

- **types.ts** – Shared types: `CalculatorConfig`, `SwitcherConfig`, `ResultBlockKey`, etc.
- **etsy.ts** – Etsy calculator configs (profit, fee, break-even)
- **index.ts** – Registry: `getCalculatorConfig(variant)`, `listCalculatorConfigs()`

## Adding a New Marketplace

1. Create `config/calculators/<marketplace>.ts` (e.g. `amazon.ts`)
2. Define content in `lib/calculatorContent.ts` or inline
3. Define `SwitcherConfig` and `CalculatorConfig` entries
4. Register in `config/calculators/index.ts`:

```ts
import { AMAZON_CALCULATOR_CONFIGS } from "./amazon";

const REGISTRY: Record<string, CalculatorConfig> = {
  ...ETSY_CALCULATOR_CONFIGS,
  ...AMAZON_CALCULATOR_CONFIGS,
};
```

5. Add route pages (e.g. `app/amazon-profit-calculator/page.tsx`) that render `<CalculatorPage variant="amazon-profit-calculator" />`

## Config Fields

| Field | Purpose |
|-------|---------|
| `content` | Headings, support block, FAQ, includes, howTo |
| `resultOrder` | Order of result blocks: `["summary","fee","breakEven"]` |
| `switcher` | Nav items for related calculators in same marketplace |
