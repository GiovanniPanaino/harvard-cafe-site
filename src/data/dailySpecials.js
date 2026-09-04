export const dailySpecials = {
  Monday: {
    label: 'Monday',
    title: 'Half Price Pizza',
    description: 'Enjoy half price on all pizzas every Monday.',
    type: 'discount',
    discountPercent: 50,
    categoryIds: ['pizzas', 'pizza'],
  },
  Tuesday: {
    label: 'Tuesday',
    title: 'Half Price Seafood & Burgers',
    description: 'Half price on all seafood and burgers.',
    type: 'discount',
    discountPercent: 50,
    categoryIds: ['seafood', 'burgers'],
  },
  Wednesday: {
    label: 'Wednesday',
    title: 'Steaks & Ribs',
    description: 'Wednesday is for steaks and ribs.',
    type: 'featured',
    categoryIds: ['steaks', 'ribs', 'steaks-ribs', 'meaty-treats', 'combos'],
    itemMatch: ['RIB', 'SIRLOIN', 'STEAK'],
  },
  Thursday: {
    label: 'Thursday',
    title: 'Sushi Special',
    description: 'Thursday is sushi day at Harvard Cafe.',
    type: 'featured',
    categoryIds: ['sushi'],
  },
  Friday: {
    label: 'Friday',
    title: 'Kids Eat Free',
    description: 'Kids eat free every Friday.',
    type: 'kids-free',
    categoryIds: ['kiddies', 'kids'],
  },
  Saturday: {
    label: 'Saturday',
    title: 'Breakfast Buffet',
    description: 'Start the weekend with the Harvard Cafe breakfast buffet.',
    type: 'buffet',
    categoryIds: ['breakfast'],
    itemMatch: ['WEEKEND BREAKFAST BUFFET'],
  },
  Sunday: {
    label: 'Sunday',
    title: 'Breakfast Buffet & Lunch Buffet',
    description: 'Sunday breakfast buffet and lunch buffet.',
    type: 'buffet',
    categoryIds: ['breakfast'],
    itemMatch: ['WEEKEND BREAKFAST BUFFET', 'SUNDAY LUNCH BUFFET'],
  },
}

export const weeklySpecials = Object.values(dailySpecials)
