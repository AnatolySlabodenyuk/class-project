import Character from '../Character';
import Bowman from '../Bowman';
import Swordsman from '../Swordsman';
import Magician from '../Magician';
import Daemon from '../Daemon';
import Undead from '../Undead';
import Zombie from '../Zombie';

describe('Character class validation', () => {
  test('should match created object with expected properties (short name)', () => {
    expect(() => new Character('A', 'Bowman')).toThrow('Name length must be between 2 and 10 characters');
  });

  test('should match created object with expected properties (long name)', () => {
    expect(() => new Character('SuperLongNameForCharacter', 'Bowman')).toThrow('Name length must be between 2 and 10 characters');
  });

  test('should throw error for invalid type', () => {
    expect(() => new Character('Test', 'Warrior')).toThrow('Invalid character type');
  });

  test('should create valid character with correct default stats', () => {
    // Direct Character creation is technically allowed if type is valid, though usually abstract.
    // Based on requirements, Character is the base, properties validation is on valid types.
    const char = new Character('Test', 'Bowman');
    expect(char).toEqual({
      name: 'Test',
      type: 'Bowman',
      health: 100,
      level: 1,
      attack: undefined,
      defence: undefined,
    });
  });
});

describe('Subclasses creation', () => {
  test.each([
    [Bowman, 'Bowman', 'Bowman', 25, 25],
    [Swordsman, 'Swordsman', 'Swordsman', 40, 10],
    [Magician, 'Magician', 'Magician', 10, 40],
    [Daemon, 'Daemon', 'Daemon', 10, 40],
    [Undead, 'Undead', 'Undead', 25, 25],
    [Zombie, 'Zombie', 'Zombie', 40, 10],
  ])('should create %s instance with correct properties', (Class, name, expectedType, expectedAttack, expectedDefence) => {
    const char = new Class(name);
    expect(char).toEqual({
      name: name,
      type: expectedType,
      health: 100,
      level: 1,
      attack: expectedAttack,
      defence: expectedDefence,
    });
  });
});
