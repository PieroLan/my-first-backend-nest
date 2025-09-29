import 'reflect-metadata';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EntityFormatter {
  static format<T>(
    dto: any,
    EntityClass: new () => T,
    relations: Record<string, string> = {},
  ): T {
    const entity = new EntityClass() as Record<string, any>;
    for (const key in dto) {
      const value = dto[key];
      const targetKey = relations[key] || key;
      const targetType = Reflect.getMetadata(
        'design:type',
        EntityClass.prototype,
        targetKey,
      );
      if (relations[key]) {
        entity[relations[key]] = { id: this.castToType(value, targetType) };
      } else {
        entity[key] = this.castToType(value, targetType);
      }
    }
    return entity as T;
  }

  private static castToType(value: any, targetType: any): any {
    if (value === null || value === undefined) return null;
    switch (targetType) {
      case String:
        return String(value);
      case Number:
        return Number(value);
      case Boolean:
        return value === 'true' || value === true;
      case Date:
        return new Date(value);
      default:
        return value;
    }
  }
}
