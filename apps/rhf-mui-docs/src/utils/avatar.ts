const randomUserBaseURL = 'https://randomuser.me/api/portraits';

export function getRandomUserAvatar(gender: 'men' | 'women', index: number) {
  return `${randomUserBaseURL}/${gender}/${index}.jpg`;
}
