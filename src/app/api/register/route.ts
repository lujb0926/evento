import { passwordHash } from '@/components/utils';
import DBconnect from '@/lib/db';
import User from '@/lib/models/user'

export async function POST(requst: Request) {
  const req = await requst.json();
  await DBconnect();

  const existingUser = await User.findOne({
    email: req.email
  })
  if (!!existingUser) {
    return Response.json({ error: 'Email already in use ' }, { status: 500 });
  }
  try {
    const hashPwd = await passwordHash(req.password)
    const newUser = new User({
      email: req.email,
      password: hashPwd
    })
    await newUser.save();
    return Response.json({ user: newUser }, { status: 200 })
  } catch (error) {
    return Response.json({ error: 'Something went wrong' }, { status: 500 })
  }
}