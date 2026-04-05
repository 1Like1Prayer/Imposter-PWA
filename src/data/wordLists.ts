import type { CategoryName, CategoryInfo } from '../types/game';
import i18next from 'i18next';

/** Raw word entry — just the key used for translation lookups */
export interface RawWordEntry {
  key: string; // English word key, e.g. "Pizza"
  category: string; // lowercase category id, e.g. "food"
}

/** Translated word entry used during gameplay */
export interface WordEntry {
  word: string;
  hint: string;
}

/** Get translated categories — call at render time, not module load */
export function getCategories(): CategoryInfo[] {
  return [
    {
      name: 'Food',
      emoji: '🍕',
      description: i18next.t(
        'categories.food.desc',
        'Tasty dishes & ingredients'
      )
    },
    {
      name: 'Hobbies',
      emoji: '🎨',
      description: i18next.t('categories.hobbies.desc', 'Fun things people do')
    },
    {
      name: 'Nature',
      emoji: '🌿',
      description: i18next.t('categories.nature.desc', 'The natural world')
    },
    {
      name: 'Characters',
      emoji: '🦸',
      description: i18next.t(
        'categories.characters.desc',
        'Disney, Legends, Heroes...'
      )
    },
    {
      name: 'Jobs',
      emoji: '👷',
      description: i18next.t(
        'categories.jobs.desc',
        'Occupations & professions'
      )
    },
    {
      name: 'Places',
      emoji: '🗺️',
      description: i18next.t(
        'categories.places.desc',
        'Locations around the world'
      )
    },
    {
      name: 'Animals',
      emoji: '🐾',
      description: i18next.t('categories.animals.desc', 'Creatures big & small')
    },
    {
      name: 'Sports',
      emoji: '⚽',
      description: i18next.t('categories.sports.desc', 'Games & athletics')
    }
  ];
}

/** Translate a raw word entry using the current language */
export function translateWord(raw: RawWordEntry): WordEntry {
  return {
    word: i18next.t(`words.${raw.category}.${raw.key}.name`, raw.key),
    hint: i18next.t(`words.${raw.category}.${raw.key}.hint`, raw.key)
  };
}

/** Helper to define a raw word entry */
function w(category: string, key: string): RawWordEntry {
  return { key, category };
}

/** Raw word lists — no translations, just keys */
const RAW_WORD_LISTS: Record<CategoryName, RawWordEntry[]> = {
  Food: [
    w('food', 'Pizza'),
    w('food', 'Sushi'),
    w('food', 'Tacos'),
    w('food', 'Pasta'),
    w('food', 'Burger'),
    w('food', 'Chocolate'),
    w('food', 'Ice Cream'),
    w('food', 'Pancakes'),
    w('food', 'Steak'),
    w('food', 'Salad'),
    w('food', 'Croissant'),
    w('food', 'Ramen'),
    w('food', 'Falafel'),
    w('food', 'Popcorn'),
    w('food', 'Waffles'),
    w('food', 'Curry'),
    w('food', 'Donut'),
    w('food', 'Lasagna'),
    w('food', 'Hummus'),
    w('food', 'Cheesecake')
  ],
  Hobbies: [
    w('hobbies', 'Painting'),
    w('hobbies', 'Gaming'),
    w('hobbies', 'Gardening'),
    w('hobbies', 'Photography'),
    w('hobbies', 'Cooking'),
    w('hobbies', 'Reading'),
    w('hobbies', 'Knitting'),
    w('hobbies', 'Fishing'),
    w('hobbies', 'Dancing'),
    w('hobbies', 'Hiking'),
    w('hobbies', 'Singing'),
    w('hobbies', 'Surfing'),
    w('hobbies', 'Origami'),
    w('hobbies', 'Chess'),
    w('hobbies', 'Yoga'),
    w('hobbies', 'Pottery'),
    w('hobbies', 'Skateboarding'),
    w('hobbies', 'Astronomy'),
    w('hobbies', 'Drawing'),
    w('hobbies', 'Camping')
  ],
  Nature: [
    w('nature', 'Volcano'),
    w('nature', 'Waterfall'),
    w('nature', 'Rainbow'),
    w('nature', 'Forest'),
    w('nature', 'Ocean'),
    w('nature', 'Mountain'),
    w('nature', 'Desert'),
    w('nature', 'Glacier'),
    w('nature', 'Coral Reef'),
    w('nature', 'Aurora'),
    w('nature', 'Thunder'),
    w('nature', 'Tornado'),
    w('nature', 'Earthquake'),
    w('nature', 'Sunrise'),
    w('nature', 'Cave'),
    w('nature', 'River'),
    w('nature', 'Island'),
    w('nature', 'Jungle'),
    w('nature', 'Snowflake'),
    w('nature', 'Lightning')
  ],
  Characters: [
    w('characters', 'Elsa'),
    w('characters', 'Spider-Man'),
    w('characters', 'Shrek'),
    w('characters', 'Batman'),
    w('characters', 'Pikachu'),
    w('characters', 'Mario'),
    w('characters', 'Simba'),
    w('characters', 'Buzz Lightyear'),
    w('characters', 'Gandalf'),
    w('characters', 'Darth Vader'),
    w('characters', 'Wonder Woman'),
    w('characters', 'Genie'),
    w('characters', 'Harry Potter'),
    w('characters', 'Mulan'),
    w('characters', 'Thor'),
    w('characters', 'Cinderella'),
    w('characters', 'Hulk'),
    w('characters', 'Nemo'),
    w('characters', 'Robin Hood'),
    w('characters', 'Rapunzel')
  ],
  Jobs: [
    w('jobs', 'Firefighter'),
    w('jobs', 'Astronaut'),
    w('jobs', 'Chef'),
    w('jobs', 'Detective'),
    w('jobs', 'Pilot'),
    w('jobs', 'Doctor'),
    w('jobs', 'Teacher'),
    w('jobs', 'Lifeguard'),
    w('jobs', 'Scientist'),
    w('jobs', 'Artist'),
    w('jobs', 'Mechanic'),
    w('jobs', 'Architect'),
    w('jobs', 'Journalist'),
    w('jobs', 'Surgeon'),
    w('jobs', 'Veterinarian'),
    w('jobs', 'Electrician'),
    w('jobs', 'Photographer'),
    w('jobs', 'Plumber'),
    w('jobs', 'Lawyer'),
    w('jobs', 'Musician')
  ],
  Places: [
    w('places', 'Paris'),
    w('places', 'Tokyo'),
    w('places', 'New York'),
    w('places', 'Egypt'),
    w('places', 'Amazon'),
    w('places', 'Antarctica'),
    w('places', 'Rome'),
    w('places', 'Hawaii'),
    w('places', 'London'),
    w('places', 'Sydney'),
    w('places', 'Dubai'),
    w('places', 'Venice'),
    w('places', 'Hollywood'),
    w('places', 'Mars'),
    w('places', 'Bermuda Triangle'),
    w('places', 'Mount Everest'),
    w('places', 'Sahara'),
    w('places', 'Las Vegas'),
    w('places', 'Atlantis'),
    w('places', 'North Pole')
  ],
  Animals: [
    w('animals', 'Dolphin'),
    w('animals', 'Eagle'),
    w('animals', 'Penguin'),
    w('animals', 'Tiger'),
    w('animals', 'Elephant'),
    w('animals', 'Octopus'),
    w('animals', 'Chameleon'),
    w('animals', 'Panda'),
    w('animals', 'Shark'),
    w('animals', 'Butterfly'),
    w('animals', 'Wolf'),
    w('animals', 'Koala'),
    w('animals', 'Flamingo'),
    w('animals', 'Gorilla'),
    w('animals', 'Seahorse'),
    w('animals', 'Owl'),
    w('animals', 'Cheetah'),
    w('animals', 'Jellyfish'),
    w('animals', 'Parrot'),
    w('animals', 'Turtle')
  ],
  Sports: [
    w('sports', 'Basketball'),
    w('sports', 'Tennis'),
    w('sports', 'Swimming'),
    w('sports', 'Soccer'),
    w('sports', 'Boxing'),
    w('sports', 'Skiing'),
    w('sports', 'Archery'),
    w('sports', 'Volleyball'),
    w('sports', 'Gymnastics'),
    w('sports', 'Surfing'),
    w('sports', 'Baseball'),
    w('sports', 'Fencing'),
    w('sports', 'Golf'),
    w('sports', 'Rugby'),
    w('sports', 'Karate'),
    w('sports', 'Hockey'),
    w('sports', 'Snowboarding'),
    w('sports', 'Wrestling'),
    w('sports', 'Badminton'),
    w('sports', 'Table Tennis')
  ]
};

export default RAW_WORD_LISTS;
