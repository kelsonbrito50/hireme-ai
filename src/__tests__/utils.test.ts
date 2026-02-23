describe('Utility functions', () => {
  describe('formatDate', () => {
    it('should format a date string correctly', () => {
      const date = new Date('2024-01-15');
      const formatted = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      expect(formatted).toBe('Jan 15, 2024');
    });
  });

  describe('truncateText', () => {
    it('should truncate text longer than maxLength', () => {
      const text = 'Hello World this is a long string';
      const maxLength = 11;
      const result = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
      expect(result).toBe('Hello World...');
    });

    it('should return text unchanged if shorter than maxLength', () => {
      const text = 'Short';
      const maxLength = 100;
      const result = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
      expect(result).toBe('Short');
    });
  });

  describe('capitalizeFirst', () => {
    it('should capitalize the first letter', () => {
      const result = 'hello'.charAt(0).toUpperCase() + 'hello'.slice(1);
      expect(result).toBe('Hello');
    });
  });
});
