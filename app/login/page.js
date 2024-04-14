import { Button } from '@/components/ui/button';
import { login, signup } from './actions';

import { Input } from '@/components/ui/input';

export default function LoginPage() {
  return (
    <div className='screen-size w-full flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold mb-12'>True Do</h1>
      <form className='flex flex-col space-y-2'>
        <Input
          className='bg-light-off-white ring-0 border-gray-300 focus:bg-white transition-all outline-none shadow-sm'
          placeholder='Email'
          id='email'
          name='email'
          type='email'
          required
        />
        <Input
          className='bg-light-off-white ring-0 border-gray-300 focus:bg-white transition-all outline-none shadow-sm'
          placeholder='password'
          id='password'
          name='password'
          type='password'
          required
        />
        <div className='flex flex-row justify-center space-x-4'>
          <Button
            variant='secondary'
            className='bg-light-off-white shadow-sm hover:shadow-none hover:bg-white'
            size='sm'
            formAction={login}
          >
            Log in
          </Button>
          <Button
            variant='secondary'
            size='sm'
            className='bg-light-off-white shadow-sm hover:shadow-none hover:bg-white'
            formAction={signup}
          >
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
}
