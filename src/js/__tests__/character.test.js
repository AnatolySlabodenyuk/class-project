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

describe('Character Logic', () => {
  test('levelUp should increase level and stats', () => {
    const char = new Bowman('Bowman');
    char.health = 50; // Reduce health to check reset
    char.levelUp();

    expect(char.level).toBe(2);
    expect(char.attack).toBe(25 * 1.2);
    expect(char.defence).toBe(25 * 1.2);
    expect(char.health).toBe(100);
  });

  test('levelUp should throw error if health is 0', () => {
    const char = new Bowman('Bowman');
    char.health = 0;

    expect(() => char.levelUp()).toThrow('Cannot level up a dead character');
  });

  test('damage should reduce health correctly', () => {
    const char = new Bowman('Bowman'); // def: 25
    // Damage: 10 * (1 - 25/100) = 10 * 0.75 = 7.5
    // Health: 100 - 7.5 = 92.5
    char.damage(10);
    expect(char.health).toBeCloseTo(92.5);
  });

  test('damage should not reduce health below 0', () => {
    const char = new Bowman('Bowman'); // def: 25
    // Damage to kill: need > 100 / 0.75 = 133.33 -> let's do 200
    char.damage(200);
    expect(char.health).toBe(0);
  });

  test('damage should do nothing if health is already 0', () => {
    const char = new Bowman('Bowman');
    char.health = 0;
    char.damage(10);
    expect(char.health).toBe(0);
  });
});
