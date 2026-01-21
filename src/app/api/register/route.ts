import { passwordHash } from '@/components/utils';
import DBconnect from '@/lib/db';
import User from '@/lib/models/user'

export async function POST(requst: Request) {
  const req = await requst.json();
  await DBconnect();

  console.log('---', requst.url, req);
  const existingUser = await User.findOne({
    email: req.email
  })
  console.log('save is start0000', existingUser);
  if (!!existingUser) {
    return Response.json({ error: 'Email already in use ' }, { status: 500 });
  }
  try {
    console.log('save is start111');
    const hashPwd = await passwordHash(req.password)
    const newUser = new User({
      email: req.email,
      password: hashPwd
    })
    console.log('save is start222');
    await newUser.save();
    console.log('save is finished');
    
    return Response.json({ user: newUser }, { status: 200 })
  } catch (error) {
    return Response.json({ error: 'Something went wrong' }, { status: 500 })
  }
}