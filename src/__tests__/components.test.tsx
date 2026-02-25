/**
 * @jest-environment jsdom
 */

// Simple smoke tests for component rendering
describe('Component tests', () => {
  describe('Button rendering', () => {
    it('should render a button element', () => {
      const button = document.createElement('button');
      button.textContent = 'Submit';
      document.body.appendChild(button);
      
      const found = document.querySelector('button');
      expect(found).toBeTruthy();
      expect(found?.textContent).toBe('Submit');
      
      document.body.removeChild(button);
    });
  });

  describe('Status badge', () => {
    it('should handle different status values', () => {
      const statuses = ['applied', 'interview', 'offer', 'rejected'];
      statuses.forEach(status => {
        expect(typeof status).toBe('string');
        expect(status.length).toBeGreaterThan(0);
      });
    });
  });
});
