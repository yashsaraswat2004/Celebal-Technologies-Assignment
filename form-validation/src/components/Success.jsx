import { useLocation, Link } from 'react-router-dom';

const Success = () => {
  const { state } = useLocation();

  return (
    <div className="p-6 max-w-xl mx-auto bg-green-50 border border-green-300 rounded shadow">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Form Submitted Successfully!</h2>
      <ul className="space-y-2">
        {Object.entries(state).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value}</li>
        ))}
      </ul>
      <Link to="/" className="block mt-4 text-blue-600 underline">Back to form</Link>
    </div>
  );
};

export default Success;
