export const ErrorMessage = ({ error }: { error?: string }) => {
  if (!error) return null;
  return <p className="mt-1 text-sm text-red-500">{error}</p>;
};