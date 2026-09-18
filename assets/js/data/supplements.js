// Supplements shown on the Supplements page.
// Timing notes come from the user's source document. `summary`, `details`, `evidence`, and `caution` are
// editorial content informed by the user's supplements review and nutrition review, and should be reviewed before
// publishing. No doses on purpose: most have no established PCOS dose.
// `timing: null` means no timing is shown (used for "not recommended" entries); those are left out of the cheat sheet.

export const EVIDENCE = {
  established: 'Established guidance',
  research: 'Research finding',
  association: 'Association',
  emerging: 'Emerging hypothesis',
};

export const SUPPLEMENT_GROUPS = {
  pcos: { label: 'Studied for PCOS', filterIcon: '🔬' },
  herb: { label: 'Herb or spice', filterIcon: '🍃' },
  avoid: { label: 'Not recommended', filterIcon: '⚠️' },
  vitamin: { label: 'Vitamin', filterIcon: '🍊' },
  mineral: { label: 'Mineral', filterIcon: '🧂' },
  other: { label: 'Other nutrient', filterIcon: '🥚' },
};

export const TIMING = {
  fat: {
    icon: '🥑',
    short: 'With fat',
    title: 'With a meal that has fat',
    description: 'These are absorbed better alongside some fat, like olive oil, nuts, avocado, or eggs.',
  },
  food: {
    icon: '🍽️',
    short: 'With food',
    title: 'With food',
    description: 'Taking these with a meal can reduce stomach upset, nausea, or flushing.',
  },
  any: {
    icon: '🕐',
    short: 'Any time',
    title: 'Any time',
    description: 'Timing doesn’t matter much for these. Taking them consistently matters more.',
  },
};

// Within each group, entries are ordered from most to least researched.
export const SUPPLEMENTS = [
  // Studied for PCOS
  {
    id: 'inositol', name: 'Inositol', emoji: '💊', group: 'pcos', evidence: 'research', timing: 'any',
    summary: 'May help some metabolic measures. Fertility benefits are uncertain.',
    details: 'One of the most studied supplements for PCOS. It may improve some metabolic measures, like insulin sensitivity. The 2023 international guideline says it can be considered based on personal preference, since harm appears limited, but its clinical benefits are limited and its use for fertility is still considered experimental.',
    timingNote: 'Usually taken consistently every day, with or without food. Research protocols sometimes split it into more than one dose.',
    caution: 'Can cause mild stomach upset for some people. It shouldn’t replace recommended fertility treatment.',
  },
  {
    id: 'vitamin-d', name: 'Vitamin D', emoji: '☀️', group: 'pcos', evidence: 'established', timing: 'fat',
    summary: 'Low levels are common in PCOS. Correcting a deficiency matters.',
    details: 'Low vitamin D is common in people with PCOS, and testing for and correcting a deficiency is standard care. Taking high doses just to improve fertility or IVF success isn’t supported.',
    timingNote: 'Best taken with a meal that contains some fat to help absorption. Consistency matters more than timing.',
    caution: 'It builds up in the body, so very high doses over time can be harmful. A blood test can show whether you need it.',
  },
  {
    id: 'omega-3', name: 'Omega-3 (DHA/EPA)', emoji: '🐟', group: 'pcos', evidence: 'research', timing: 'fat',
    summary: 'Studied for triglycerides and inflammation. Not proven for fertility.',
    details: 'Research in PCOS has looked at omega-3s for triglycerides, inflammation, and other metabolic markers. They can be a reasonable part of your nutrition, but they haven’t been shown to improve fertility or IVF success.',
    timingNote: 'Best taken with a meal, especially one with some fat. Consistent use matters more than a specific time.',
    caution: 'Check with your provider if you take blood thinners, and look for a quality-tested product.',
  },
  {
    id: 'berberine', name: 'Berberine', emoji: '🌿', group: 'pcos', evidence: 'research', timing: 'food',
    summary: 'Studied for blood sugar and insulin sensitivity.',
    details: 'Often studied for blood sugar regulation, insulin sensitivity, and other metabolic outcomes in PCOS. There’s no universally established PCOS dose, and evidence specific to fertility treatment is insufficient.',
    timingNote: 'Can generally be taken with food, which may reduce stomach discomfort. Studies typically use consistent daily use rather than occasional use.',
    caution: 'Not safe during pregnancy or breastfeeding, so it should never be treated as a pregnancy supplement. It can also interact with several medications, including diabetes medicines.',
  },
  {
    id: 'nac', name: 'NAC (N-acetylcysteine)', emoji: '🫧', group: 'pcos', evidence: 'research', timing: 'food',
    summary: 'Small studies on ovulation and insulin. Still investigational.',
    details: 'Small studies in PCOS have suggested possible improvements in ovulation and metabolic measures, but larger analyses are limited by small, varied trials, so it’s considered investigational rather than standard care.',
    timingNote: 'Can be taken with or without food. Taking it with food may reduce stomach discomfort. Studies generally use consistent supplementation.',
    caution: 'Can cause digestive side effects and may interact with some medications.',
  },
  {
    id: 'melatonin', name: 'Melatonin', emoji: '😴', group: 'pcos', evidence: 'research', timing: 'any',
    summary: 'Studied for egg and embryo quality. No clear effect on live births.',
    details: 'Melatonin has antioxidant effects in the ovaries and has been studied in PCOS and IVF. Some analyses found more mature eggs and better embryo measures, but no clear increase in live births, so it isn’t routinely recommended.',
    timingNote: 'Usually taken in the evening, since it can cause drowsiness. There’s no established PCOS-specific dose.',
    caution: 'Can cause drowsiness and interact with some medications, including sedatives.',
  },
  {
    id: 'magnesium', name: 'Magnesium glycinate', emoji: '🌙', group: 'pcos', evidence: 'emerging', timing: 'food',
    summary: 'Studied for insulin sensitivity, sleep, and stress.',
    details: 'Magnesium plays a role in how the body uses insulin, and it has been studied for sleep and stress. Studies in PCOS have had inconsistent results.',
    timingNote: 'Can be taken with or without food. Taking it with food may reduce stomach upset, and no specific time of day is required.',
    caution: 'High doses can cause digestive upset. People with kidney problems should check with a provider first.',
  },
  {
    id: 'coq10', name: 'CoQ10', emoji: '⚡', group: 'pcos', evidence: 'emerging', timing: 'fat',
    summary: 'Most studied for low egg reserve, not PCOS itself.',
    details: 'CoQ10 supports energy production in cells. It has been studied most for people with a low egg reserve during IVF, where some studies found more eggs retrieved and higher pregnancy rates. Evidence that it increases live births is lacking, and research specific to PCOS is limited.',
    timingNote: 'Best absorbed with a meal that contains fat. Studies generally use consistent supplementation rather than occasional use.',
    caution: null,
  },
  {
    id: 'ala', name: 'Alpha-lipoic acid (ALA)', emoji: '🔋', group: 'pcos', evidence: 'emerging', timing: 'any',
    summary: 'Early research on insulin sensitivity.',
    details: 'Alpha-lipoic acid has been studied for insulin sensitivity and oxidative stress. Evidence in PCOS is still early.',
    timingNote: 'Can be taken with or without food. There’s no established PCOS-specific timing or dose.',
    caution: null,
  },
  {
    id: 'probiotics', name: 'Probiotics & prebiotics', emoji: '🦠', group: 'pcos', evidence: 'emerging', timing: 'any',
    summary: 'Studied for gut health, inflammation, and metabolic markers.',
    details: 'Studied for their potential effects on the gut microbiome, digestion, inflammation, and metabolic markers in PCOS. Different probiotic strains can have different effects, and evidence for improving PCOS itself is still developing.',
    timingNote: 'Depending on the product, can generally be taken with or without food. Consistency matters more than a specific time. There’s no universal dose or schedule.',
    caution: null,
  },
  {
    id: 'chromium', name: 'Chromium', emoji: '💠', group: 'pcos', evidence: 'emerging', timing: 'any',
    summary: 'Studied for insulin and blood sugar, with mixed results.',
    details: 'Chromium picolinate has been studied for insulin resistance and blood sugar in PCOS. Some trials reported benefits, while others found no clear change, so the results are mixed.',
    timingNote: 'There’s no established PCOS-specific timing or dose.',
    caution: 'Talk with your provider if you take diabetes medicine, since it may affect blood sugar.',
  },
  {
    id: 'l-arginine', name: 'L-arginine', emoji: '🫀', group: 'pcos', evidence: 'emerging', timing: 'any',
    summary: 'Small studies on insulin sensitivity and blood flow.',
    details: 'Small studies have looked at L-arginine for insulin sensitivity and blood vessel health. Evidence in PCOS is limited.',
    timingNote: 'Can be taken with or without food, but timing and amount depend on why it’s being used. There’s no established general PCOS schedule.',
    caution: 'It can lower blood pressure and interact with some heart and blood pressure medicines.',
  },
  {
    id: 'resveratrol', name: 'Resveratrol', emoji: '🍇', group: 'pcos', evidence: 'emerging', timing: 'any',
    summary: 'A plant compound with early research only.',
    details: 'A compound found in grapes. One recent trial in PCOS reported promising effects during fertility treatment, but a single study isn’t enough, so it’s still considered investigational.',
    timingNote: 'There’s no established timing or dose.',
    caution: 'It can interact with some medications.',
  },
  {
    id: 'maca', name: 'Maca', emoji: '🌱', group: 'pcos', evidence: 'emerging', timing: 'any',
    summary: 'Traditionally used for energy. Little PCOS-specific research.',
    details: 'Maca is traditionally used for energy and libido, but there’s very little research specific to PCOS.',
    timingNote: 'Can generally be taken with or without food. There’s no established PCOS-specific timing or dose.',
    caution: 'Its effects on hormones aren’t well understood, so check with your provider first.',
  },

  // Herbs & spices being studied
  {
    id: 'cinnamon', name: 'Cinnamon', emoji: '🍂', group: 'herb', evidence: 'emerging', timing: 'food',
    summary: 'Studied for blood sugar and insulin.',
    details: 'A review of trials in PCOS found cinnamon supplements lowered fasting blood sugar and insulin measures, but didn’t change weight. The products and amounts used varied a lot.',
    timingNote: 'Easy to add to foods like oatmeal or yogurt. Supplement forms and amounts vary, and there’s no established PCOS dose.',
    caution: 'Cassia cinnamon in concentrated supplement amounts contains coumarin, which can affect the liver.',
  },
  {
    id: 'turmeric', name: 'Turmeric (curcumin)', emoji: '🧡', group: 'herb', evidence: 'emerging', timing: 'fat',
    summary: 'Studied for blood sugar, insulin, and inflammation.',
    details: 'Curcumin, the active compound in turmeric, has been studied for blood sugar, insulin sensitivity, and androgen levels in PCOS. Small trials show some promise, but larger and longer studies are needed.',
    timingNote: 'Often taken with a meal that has some fat. Supplement forms vary, and there’s no established PCOS dose.',
    caution: 'Concentrated supplements can upset the stomach and may interact with blood thinners.',
  },
  {
    id: 'sage', name: 'Sage', emoji: '🍃', group: 'herb', evidence: 'emerging', timing: 'any',
    summary: 'One small study on insulin resistance.',
    details: 'One trial in women with PCOS found a sage extract improved insulin resistance and lowered BMI over eight weeks. More research is needed.',
    timingNote: 'Used as a cooking herb or tea. There’s no established PCOS dose for extracts.',
    caution: 'Concentrated extracts aren’t recommended during pregnancy.',
  },
  {
    id: 'spearmint', name: 'Spearmint & herbal blends', emoji: '🍵', group: 'herb', evidence: 'emerging', timing: 'any',
    summary: 'Early research on insulin and antioxidants.',
    details: 'In one small study, a blend of spearmint, ginger, cinnamon, and citrus improved insulin and antioxidant measures, but didn’t change how regular cycles were. Evidence is still early.',
    timingNote: 'Usually enjoyed as a tea.',
    caution: null,
  },

  // Be cautious with
  {
    id: 'dhea', name: 'DHEA', emoji: '🚫', group: 'avoid', evidence: null, timing: null,
    summary: 'Marketed for fertility, but not recommended without a doctor.',
    details: 'DHEA is a hormone the body turns into androgens. It’s sometimes marketed to improve egg quality during IVF, but results are inconsistent and current IVF guidelines don’t support routine use. Its side effects overlap with symptoms many people with PCOS already deal with.',
    timingNote: null,
    caution: 'Only use it under a doctor’s supervision. It can cause acne, unwanted hair growth, and mood changes, and it isn’t safe with hormone-sensitive conditions.',
  },
  {
    id: 'fertility-blends', name: 'Fertility & antioxidant blends', emoji: '🧴', group: 'avoid', evidence: null, timing: null,
    summary: 'Mixed products with unclear benefits.',
    details: 'These combine ingredients like vitamins C and E, selenium, zinc, CoQ10, and plant extracts. Some studies look favorable, but with so many different mixes it’s impossible to tell which ingredient, amount, or combination actually helps.',
    timingNote: null,
    caution: 'They often double up with a prenatal vitamin, and too much of some antioxidants or minerals can be harmful.',
  },

  // General vitamins
  {
    id: 'methylfolate', name: 'Methylfolate', emoji: '🥬', group: 'vitamin', evidence: 'established', timing: 'any',
    summary: 'A form of folate. Recommended before and during pregnancy.',
    details: 'Methylfolate is a form of folate, which helps the body make new cells. Folate before and during pregnancy is standard care for everyone trying to conceive, not a special fertility booster.',
    timingNote: 'Can be taken with or without food. Consistency matters more than a specific time of day.',
    caution: 'Check that your prenatal vitamin and any other products don’t double up on folate.',
  },
  {
    id: 'b12', name: 'Vitamin B12', emoji: '🥚', group: 'vitamin', evidence: 'established', timing: 'any',
    summary: 'Supports nerves and red blood cells.',
    details: 'Needed for healthy nerves and red blood cells. Long-term use of metformin, a medicine often used for PCOS, can lower B12 levels.',
    timingNote: 'Can be taken with or without food. There’s no need to fast.',
    caution: null,
  },
  {
    id: 'vitamin-a', name: 'Vitamin A', emoji: '🥕', group: 'vitamin', evidence: 'established', timing: 'fat',
    summary: 'Supports vision, skin, and immune function.',
    details: 'Vitamin A supports vision, skin, and the immune system.',
    timingNote: 'Best absorbed with a meal that contains fat.',
    caution: 'Too much preformed vitamin A can be harmful, especially during pregnancy.',
  },
  {
    id: 'vitamin-c', name: 'Vitamin C', emoji: '🍊', group: 'vitamin', evidence: 'established', timing: 'food',
    summary: 'Supports immunity and helps absorb iron from plants.',
    details: 'Vitamin C supports the immune system and helps your body absorb iron from plant foods.',
    timingNote: 'Can be taken with or without food. Taking it with food may help prevent stomach irritation.',
    caution: null,
  },
  {
    id: 'b6', name: 'Vitamin B6', emoji: '🍌', group: 'vitamin', evidence: 'established', timing: 'any',
    summary: 'Helps use protein and supports the nervous system.',
    details: 'Vitamin B6 helps your body use protein and supports the nervous system.',
    timingNote: 'Can generally be taken with or without food. Consistency matters more than timing.',
    caution: 'Very high doses taken long term can cause nerve problems.',
  },
  {
    id: 'thiamin', name: 'Thiamin (B1)', emoji: '🌾', group: 'vitamin', evidence: 'established', timing: 'any',
    summary: 'Helps turn food into energy.',
    details: 'Thiamin helps your body turn food into energy.',
    timingNote: 'Can be taken with or without food. Fasting isn’t necessary.',
    caution: null,
  },
  {
    id: 'riboflavin', name: 'Riboflavin (B2)', emoji: '🥛', group: 'vitamin', evidence: 'established', timing: 'any',
    summary: 'Helps turn food into energy.',
    details: 'Riboflavin helps your body turn food into energy and supports healthy skin.',
    timingNote: 'Can be taken with or without food. Consistency matters more than timing.',
    caution: null,
  },
  {
    id: 'niacin', name: 'Niacin (B3)', emoji: '🍗', group: 'vitamin', evidence: 'established', timing: 'food',
    summary: 'Helps turn food into energy.',
    details: 'Niacin helps your body turn food into energy.',
    timingNote: 'Usually taken with food to reduce flushing or stomach discomfort, depending on the form.',
    caution: 'High doses can cause flushing and, rarely, liver problems.',
  },
  {
    id: 'vitamin-e', name: 'Vitamin E', emoji: '🌰', group: 'vitamin', evidence: 'established', timing: 'fat',
    summary: 'An antioxidant that helps protect cells.',
    details: 'Vitamin E is an antioxidant that helps protect your cells.',
    timingNote: 'Best absorbed with a meal that contains fat.',
    caution: 'High-dose supplements aren’t appropriate for everyone.',
  },
  {
    id: 'vitamin-k', name: 'Vitamin K', emoji: '🥦', group: 'vitamin', evidence: 'established', timing: 'fat',
    summary: 'Needed for blood clotting and bone health.',
    details: 'Vitamin K is needed for normal blood clotting and healthy bones.',
    timingNote: 'Best absorbed with dietary fat.',
    caution: 'If you take blood thinners like warfarin, keep your vitamin K intake consistent and talk with your provider.',
  },

  // General minerals
  {
    id: 'iron', name: 'Iron', emoji: '🥩', group: 'mineral', evidence: 'established', timing: 'food', keepApart: true,
    summary: 'Needed for red blood cells. Low iron is common with heavy periods.',
    details: 'Iron is needed to make red blood cells. Low iron is common in people with heavy periods.',
    timingNote: 'Absorption is generally better away from meals, but taking it with food can reduce stomach upset. Don’t take it at the same time as calcium.',
    caution: 'Too much iron can be harmful, so take it only if you need it, ideally after a blood test.',
  },
  {
    id: 'iodine', name: 'Iodine', emoji: '🧂', group: 'mineral', evidence: 'established', timing: 'any',
    summary: 'Needed for thyroid hormones.',
    details: 'Iodine is needed to make thyroid hormones, and it’s especially important before and during pregnancy.',
    timingNote: 'Can be taken with or without food. Consistency matters more than a particular time.',
    caution: 'Too much iodine can affect thyroid function.',
  },
  {
    id: 'calcium', name: 'Calcium', emoji: '🦴', group: 'mineral', evidence: 'established', timing: 'food', keepApart: true,
    summary: 'Supports bones, muscles, and nerves.',
    details: 'Calcium supports strong bones and healthy muscles and nerves.',
    timingNote: 'Timing depends on the form: some forms are better absorbed with food, while others can be taken without it. Take it separately from iron.',
    caution: null,
  },
  {
    id: 'zinc', name: 'Zinc', emoji: '🦪', group: 'mineral', evidence: 'established', timing: 'food',
    summary: 'Supports immunity, skin, and wound healing.',
    details: 'Zinc supports the immune system, skin, and wound healing.',
    timingNote: 'Can be taken with food to reduce nausea.',
    caution: 'Too much zinc can be harmful and can lower copper levels, so the amount should fit your needs.',
  },
  {
    id: 'selenium', name: 'Selenium', emoji: '🥜', group: 'mineral', evidence: 'established', timing: 'any',
    summary: 'Supports thyroid function.',
    details: 'Selenium supports thyroid function and acts as an antioxidant.',
    timingNote: 'Can be taken with or without food. Consistency matters more than timing.',
    caution: 'Excessive intake can be harmful.',
  },

  // Other nutrients
  {
    id: 'choline', name: 'Choline', emoji: '🍳', group: 'other', evidence: 'established', timing: 'any',
    summary: 'Supports brain and liver health. Needs rise in pregnancy.',
    details: 'Choline supports brain development and liver function, and needs are higher during pregnancy.',
    timingNote: 'Can generally be taken with or without food. Consistency matters more than timing.',
    caution: null,
  },
];
