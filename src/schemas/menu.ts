import { z } from 'zod';

const menuSchema = z.object({
  name: z.string({
    invalid_type_error: 'Menu item name must be a string',
    required_error: 'Menu item name is required',
  }),
  price: z.number().positive(),
  alt: z.string(),
  image: z.string().url(),
  category: z.enum(['dish', 'drink', 'dessert'], {
    required_error: 'Menu category is required',
    invalid_type_error:
      'Menu category must be of type enum Category: dish, drink or dessert',
  }),
  rating: z.number().min(0).max(5),
});

export const validateMenu = function (input: any) {
  return menuSchema.safeParse(input);
};

export const validatePartialMenu = function (input: any) {
  return menuSchema.partial().safeParse(input);
};
