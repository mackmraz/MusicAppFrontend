import { useAuth } from '@/auth/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return <p>You must be logged in to view your profile.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">Your Profile</h2>
      <div className="flex items-center space-x-4 mt-4">
        {user.avatarUrl && (
          <img src={user.avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full" />
        )}
        <div>
          <p className="font-bold">{user.displayName}</p>
          <p>{user.email}</p>
        </div>
      </div>
      {/* Add editable profile fields or additional user info here */}
    </div>
  );
}
