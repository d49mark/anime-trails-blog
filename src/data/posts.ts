export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  coverImage: string;
  category: string;
  readingTime: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  coverImage: string;
  duration: string;
  audioUrl: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'neon-genesis-evangelion-psychology',
    title: 'The Hedgehog\'s Dilemma: Intimacy and Isolation in Evangelion',
    excerpt: 'Exploring the profound psychological layers of Shinji Ikari and the struggle for human connection in a world of Angels.',
    date: '2024-03-15',
    author: 'Anime Trails Editor',
    category: 'Psychology',
    readingTime: '8 min read',
    coverImage: 'https://picsum.photos/seed/evangelion/800/500',
    content: `
# The Hedgehog's Dilemma

At its core, *Neon Genesis Evangelion* is not about giant robots fighting aliens. It is a deep dive into the human psyche, specifically the concept of the "Hedgehog's Dilemma."

## What is the Hedgehog's Dilemma?

The term, originally coined by Arthur Schopenhauer and later adopted by Sigmund Freud, describes a situation where a group of hedgehogs seek to become close to each other to share heat during cold weather. However, they must remain apart, as they cannot avoid hurting each other with their sharp spines.

In the context of the show, Shinji Ikari embodies this struggle. He desperately wants love and validation but fears the pain that comes with intimacy.

> "The more I get close to others, the more I hurt them, and the more they hurt me."

## The AT Field as a Psychological Barrier

The Absolute Terror Field (AT Field) is presented as a physical shield used by Angels and Evangelions. However, the show eventually reveals that every human possesses an AT Field. It is the barrier that separates one soul from another, the wall that defines the "self."

Without this barrier, individual identity dissolves—which is exactly what the Human Instrumentality Project seeks to achieve.

## Conclusion

Evangelion challenges us to accept the pain of connection as a necessary part of being human. To live is to be hurt, but to hide from that hurt is to stop living entirely.
    `
  },
  {
    id: 'monster-johan-liebert-nihilism',
    title: 'The Nameless Monster: Johan Liebert and the Abyss of Nihilism',
    excerpt: 'A study of the most terrifying antagonist in anime history and the philosophical battle between good and evil.',
    date: '2024-03-20',
    author: 'Anime Trails Editor',
    category: 'Philosophy',
    readingTime: '12 min read',
    coverImage: 'https://picsum.photos/seed/monster/800/500',
    content: `
# The Abyss of Johan Liebert

Naoki Urasawa's *Monster* is a masterpiece of psychological suspense. At the center of this storm is Johan Liebert, a character who represents pure, calculated nihilism.

## The Nature of Evil

Johan doesn't kill out of passion or greed. He kills to prove a point: that all lives are equal in death, and that the world is inherently meaningless.

## Dr. Tenma's Moral Struggle

The conflict between Dr. Kenzo Tenma and Johan is a classic philosophical debate. Tenma believes that "all lives are equal," a belief Johan twists to justify his atrocities. If all lives are equal, then no life has special value.

## The Monster Within

The story asks a haunting question: Is a monster born, or is it made? Through the Red Rose Mansion and the experiments at Kinderheim 511, we see the systematic stripping away of humanity.

Johan is the "Nameless Monster" who wants to be the last one standing at the end of the world.
    `
  }
];

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: 'ep-1-cowboy-bebop-existentialism',
    title: 'Episode 1: Cowboy Bebop and the Weight of the Past',
    excerpt: 'We discuss Spike Spiegel\'s journey and why we all carry that weight in our daily lives.',
    date: '2024-03-25',
    author: 'Spike & Faye',
    coverImage: 'https://picsum.photos/seed/bebop/800/500',
    duration: '45 min',
    audioUrl: '#'
  },
  {
    id: 'ep-2-serial-experiments-lain-identity',
    title: 'Episode 2: The Wired and the Real in Serial Experiments Lain',
    excerpt: 'A deep dive into the digital identity and the blurring lines between the physical and virtual worlds.',
    date: '2024-03-28',
    author: 'Lain Iwakura',
    coverImage: 'https://picsum.photos/seed/lain/800/500',
    duration: '52 min',
    audioUrl: '#'
  }
];
