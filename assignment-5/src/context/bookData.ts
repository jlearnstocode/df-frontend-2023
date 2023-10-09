const bookData = [
  {
    id: 1,
    name: 'Refactoring',
    author: 'Martin Fowler',
    topic: 'Code refactoring',
  },
  {
    id: 2,
    name: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    topic: 'Database',
  },
  {
    id: 3,
    name: 'The Phoenix Project',
    author: 'Gene Kim',
    topic: 'DevOps',
  },
  {
    id: 4,
    name: 'Clean Code',
    author: 'Robert C. Martin',
    topic: 'Software Design',
  },
  {
    id: 5,
    name: 'JavaScript The Good Parts',
    author: 'Douglas Crockford',
    topic: 'JavaScript',
  },
  {
    id: 6,
    name: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    topic: 'Algorithms',
  },
  {
    id: 7,
    name: 'Cracking the Coding Interview',
    author: 'Gayle Laakmann McDowell',
    topic: 'Programming Interviews',
  },
  {
    id: 8,
    name: 'The Pragmatic Programmer',
    author: 'Andrew Hunt, David Thomas',
    topic: 'Software Development',
  },
  {
    id: 9,
    name: 'Clean Architecture',
    author: 'Robert C. Martin',
    topic: 'Software Design',
  },
  {
    id: 10,
    name: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke',
    topic: 'JavaScript',
  },
  {
    id: 11,
    name: 'The Lean Startup',
    author: 'Eric Ries',
    topic: 'Entrepreneurship',
  },
  {
    id: 12,
    name: 'Head First Design Patterns',
    author: 'Eric Freeman, Elisabeth Robson',
    topic: 'Design Patterns',
  },
  {
    id: 13,
    name: 'Continuous Delivery',
    author: 'Jez Humble, David Farley',
    topic: 'Software Development',
  },
  {
    id: 14,
    name: 'The Art of Computer Programming',
    author: 'Donald E. Knuth',
    topic: 'Algorithms',
  },
  {
    id: 15,
    name: 'Python Crash Course',
    author: 'Eric Matthes',
    topic: 'Python Programming',
  },
  {
    id: 16,
    name: 'Data Science for Business',
    author: 'Foster Provost, Tom Fawcett',
    topic: 'Data Science',
  },
  {
    id: 17,
    name: 'Crucial Conversations',
    author: 'Al Switzler, Joseph Grenny',
    topic: 'Communication',
  },
  {
    id: 18,
    name: 'Clean Agile',
    author: 'Robert C. Martin',
    topic: 'Agile Development',
  },
  {
    id: 19,
    name: 'Refactoring to Patterns',
    author: 'Joshua Kerievsky',
    topic: 'Design Patterns',
  },
  {
    id: 20,
    name: 'Practical Object-Oriented Design in Ruby',
    author: 'Sandi Metz',
    topic: 'Ruby Programming',
  },
  {
    id: 21,
    name: 'Clean Code in Rust',
    author: 'John Smith',
    topic: 'Rust Programming',
  },
  {
    id: 22,
    name: 'ReactJS for Beginners',
    author: 'Jane Doe',
    topic: 'ReactJS',
  },
  {
    id: 23,
    name: 'Blockchain Development Fundamentals',
    author: 'Alice Johnson',
    topic: 'Blockchain',
  },
  {
    id: 24,
    name: 'Next.js Mastery',
    author: 'Bob Williams',
    topic: 'Next.js',
  },
  {
    id: 25,
    name: 'TypeScript for Advanced Developers',
    author: 'Emily Brown',
    topic: 'TypeScript',
  },
  {
    id: 26,
    name: 'Mastering DevOps',
    author: 'David Clark',
    topic: 'DevOps',
  },
  {
    id: 27,
    name: 'Data Structures and Algorithms in Rust',
    author: 'Sarah Lee',
    topic: 'Rust Programming',
  },
  {
    id: 28,
    name: 'Advanced React Patterns',
    author: 'Michael Davis',
    topic: 'ReactJS',
  },
  {
    id: 29,
    name: 'Smart Contracts in Blockchain',
    author: 'Charlie Wilson',
    topic: 'Blockchain',
  },
  {
    id: 30,
    name: 'Next.js Best Practices',
    author: 'Ella Moore',
    topic: 'Next.js',
  },
  {
    id: 31,
    name: 'The Lean Startup',
    author: 'Eric Ries',
    topic: 'Entrepreneurship',
  },
  {
    id: 32,
    name: 'Head First Design Patterns',
    author: 'Eric Freeman, Elisabeth Robson',
    topic: 'Design Patterns',
  },
  {
    id: 33,
    name: 'Continuous Delivery',
    author: 'Jez Humble, David Farley',
    topic: 'Software Development',
  },
  {
    id: 34,
    name: 'The Art of Computer Programming',
    author: 'Donald E. Knuth',
    topic: 'Algorithms',
  },
  {
    id: 35,
    name: 'Python Crash Course',
    author: 'Eric Matthes',
    topic: 'Python Programming',
  },
  {
    id: 36,
    name: 'Data Science for Business',
    author: 'Foster Provost, Tom Fawcett',
    topic: 'Data Science',
  },
  {
    id: 37,
    name: 'Crucial Conversations',
    author: 'Al Switzler, Joseph Grenny',
    topic: 'Communication',
  },
  {
    id: 38,
    name: 'Clean Agile',
    author: 'Robert C. Martin',
    topic: 'Agile Development',
  },
  {
    id: 39,
    name: 'Refactoring to Patterns',
    author: 'Joshua Kerievsky',
    topic: 'Design Patterns',
  },
  {
    id: 40,
    name: 'Practical Object-Oriented Design in Ruby',
    author: 'Sandi Metz',
    topic: 'Ruby Programming',
  },
  {
    id: 41,
    name: 'Python for Data Science Handbook',
    author: 'Jake VanderPlas',
    topic: 'Data Science',
  },
  {
    id: 42,
    name: 'Agile Estimating and Planning',
    author: 'Mike Cohn',
    topic: 'Agile Development',
  },
  {
    id: 43,
    name: 'Effective Java',
    author: 'Joshua Bloch',
    topic: 'Java Programming',
  },
  {
    id: 44,
    name: 'The Art of Unit Testing',
    author: 'Roy Osherove',
    topic: 'Software Testing',
  },
  {
    id: 45,
    name: 'Docker Deep Dive',
    author: 'Nigel Poulton',
    topic: 'Docker',
  },
  {
    id: 46,
    name: 'The C Programming Language',
    author: 'Brian W. Kernighan, Dennis M. Ritchie',
    topic: 'C Programming',
  },
  {
    id: 47,
    name: "You Don't Know JS",
    author: 'Kyle Simpson',
    topic: 'JavaScript',
  },
  {
    id: 48,
    name: 'Continuous Integration',
    author: 'Paul M. Duvall, Steve Matyas, Andrew Glover',
    topic: 'Software Development',
  },
  {
    id: 49,
    name: 'Site Reliability Engineering',
    author: 'Niall Richard Murphy, Betsy Beyer, David K. Rensin, Kent Kawahara',
    topic: 'DevOps',
  },
  {
    id: 50,
    name: 'Learning React',
    author: 'Alex Banks, Eve Porcello',
    topic: 'ReactJS',
  },
];

export default bookData;
