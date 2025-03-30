import LoginButton from '@/components/LoginButton';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <LoginButton />
      {/* Add any extra info or alternative login methods as needed */}
    </div>
  );
}
