import bcrypt from 'bcrypt';

export function HashPassword(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (this: any, ...args: any[]) {
    const user = args[propertyKey === 'addUser' ? 0 : 1]; // Choose user argument based on the method being decorated
    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }

    return originalMethod.apply(this, args);
  };

  return descriptor;
}
