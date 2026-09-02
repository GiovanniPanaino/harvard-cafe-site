export const menuSnippets = {
  breakfast: {
    title: 'Breakfast',
    sections: [
      {
        heading: 'Breakfast',
        items: [
          {
            name: 'THE SPITFIRE',
            price: 'R79',
            description: '1 Egg, 2 rashers of bacon, tomato & toast served with fries',
          },
          {
            name: 'RUMPLER D.I.',
            price: 'R79',
            description: '2 Poached eggs served on rye with slices of freshly cut tomato',
          },
          {
            name: 'THE CHEETAH',
            price: 'R99',
            description:
              'Fresh cut fruit salad and muesli topped with Greek yogurt and flaked almonds. Served with honey',
          },
          {
            name: 'THE BREAKFAST WRAP',
            price: 'R125',
            description: 'Filled with smoked chicken fillet, scrambled eggs, jalapeno sauce. Served with fries',
          },
          {
            name: 'THE CHIPMUNK',
            price: 'R125',
            description:
              '2 Eggs, 3 rashers of bacon, pork chipolata, mushroom, grilled tomato and toast. Served with fries',
          },
          {
            name: 'THE HARVARD BREAKFAST',
            price: 'R149',
            description:
              '2 Eggs, 3 rashers of bacon, 120g sirloin steak, mushrooms, grilled tomato and toast. Served with fries',
          },
          {
            name: 'OMELETTE',
            price: 'R123',
            description:
              '3 Egg omelettes with your choice of 2 fillings. Served with toast. Fillings: Mushrooms, ham, cheese, tomato, onion, bacon',
          },
        ],
      },
      {
        heading: 'Breakfast Continued',
        items: [
          {
            name: 'CHEESE GRILLER BREAKFAST',
            price: 'R115',
            description: 'Cheese griller, 2 slice bacon, 2 eggs, tomato and toast. Served with fries.',
          },
          {
            name: 'MONDAY TO FRIDAY BREAKFAST SPECIAL',
            price: 'R79',
            description: 'Monday to Friday, 08H00 to 12H00 with Filter Coffee',
          },
          {
            name: 'THE BANTING BREAKFAST',
            price: 'R110',
            description: '2 Eggs, 3 rashers of bacon, tomato, avocado and feta cheese',
          },
        ],
      },
      {
        heading: "The Benedict's",
        items: [
          {
            name: 'THE ORYX',
            price: 'R110',
            description:
              '2 Poached eggs, bacon and cheddar cheese, served on rye toast and topped with hollandaise sauce',
          },
          {
            name: 'THE SKELTON',
            price: 'R110',
            description: '2 Poached eggs, spinach & feta cheese served on rye toast and topped with hollandaise sauce',
          },
        ],
      },
      {
        heading: 'Buffets',
        items: [
          {
            name: 'WEEKEND BREAKFAST BUFFET',
            price: 'R99',
            description: "Saturday's, Sunday's and Public Holidays. 8:30 to 12:00. Kids under 10 R49.50",
          },
          {
            name: 'SUNDAY LUNCH BUFFET',
            price: 'R149',
            description: 'Incl. Public Holidays. Kids under 10 R99',
          },
        ],
      },
    ],
  },
  wraps: {
    title: 'Wraps',
    sections: [
      {
        heading: 'Wraps',
        note: 'Served with fries',
        items: [
          {
            name: 'GRILLED HALLOUMI WRAP',
            price: 'R112',
            description: 'Grilled halloumi & avo with sweet chilli sauce',
          },
          {
            name: 'SESAME CHICKEN WRAP',
            price: 'R123',
            description: 'Grilled chicken strips with sesame seeds, feta, avo & sweet chilli sauce',
          },
          {
            name: 'SMOKED CHICKEN WRAP',
            price: 'R118',
            description: 'Smoked chicken, avo, feta & sweet chilli sauce',
          },
          {
            name: 'SPICY BEEF WRAP',
            price: 'R133',
            description: 'Strips of grilled sirloin steak, with jalapenos and feta cheese',
          },
          {
            name: 'SMOKED SALMON WRAP',
            price: 'R144',
            description: 'Smoked salmon with chunky cottage cheese & avo',
          },
        ],
      },
    ],
  },
}

export const sampleMenuSnippet = {
  title: 'Menu Preview',
  sections: [...menuSnippets.breakfast.sections, ...menuSnippets.wraps.sections],
}

export function getMenuSnippet(categoryName) {
  const key = categoryName.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  return menuSnippets[key] || null
}
