import { AppButton } from "@atlanticcity/ui";

import type { PokemonCategory } from "../hooks/usePokemonCategories";

export function PokemonCategoryList({
  categories
}: {
  categories: PokemonCategory[];
}) {
  return (
    <section className="mt-5 flex flex-wrap gap-2 pb-1">
      {categories.map((category) => (
        <AppButton
          asChild
          className="shrink-0"
          key={category.type}
          size="sm"
          variant="outline"
        >
          <a href={`#category-${category.type}`}>{category.label}</a>
        </AppButton>
      ))}
    </section>
  );
}
