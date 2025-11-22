export const isContentLocked = (): boolean => {
  const unlockDate = new Date('2025-12-15T00:00:00');
  const now = new Date();
  return now < unlockDate;
};

export const getUnlockDate = (): string => {
  return 'December 15, 2025';
};
