'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

interface IInterpretation {
  $id: string;
  term: string;
  interpretation: string;
}

export default function Home() {

  const [interpretations, setInterpretations] = useState<IInterpretation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; term: string } | null>(null);

  useEffect(() => {
    const fetchInterpretations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/interpretations');

        if (!response.ok) {
          throw new Error('Failed to fetch interpretations');
        }

        const data = await response.json();
        setInterpretations(data);

      } catch (error) {
        console.error('Error:', error);
        setError('Failed to load interpretations. Please try reloading the page.');

      } finally {
        setIsLoading(false);
      }
    };

    fetchInterpretations();

  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/interpretations/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete interpretation');
      }
      setInterpretations((prevInterpretations) => prevInterpretations.filter((i) => i.$id !== id));
      setConfirmDelete(null);
    } catch (error) {
      console.error('Delete error:', error);
      setError('Failed to delete interpretation. Please try again.');
    }
  };

  return (
    <div>

      {error && <p className="py-4 text-red-500">{error}</p>}

      {isLoading ? (
        <p>Loading interpretations...</p>
      ) : interpretations?.length > 0 ? (
        <>
          <div>
            {interpretations?.map((interpretation) => (
              <div key={interpretation.$id} className="p-4 my-2 rounded-md border-b leading-8">

                <div className="font-bold">
                  {interpretation.term}
                </div>

                <div>
                  {interpretation.interpretation}
                </div>

                <div className="flex gap-4 mt-4 justify-end">
                  <Link
                    className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest"
                    href={`/edit/${interpretation.$id}`}
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => setConfirmDelete({ id: interpretation.$id, term: interpretation.term })}
                    className="bg-red-500 text-white px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest"
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No interpretations found.</p>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-xl font-bold mb-3">Confirm Deletion</h3>
            <p className="mb-5">Would you like to confirm the exclusion of the item: <span className="font-semibold">{confirmDelete.term}</span>?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDelete(null)}
                className="rounded-md border border-slate-300 px-4 py-2 bg-white text-slate-700 hover:bg-slate-100"
              >
                Não
              </button>
              <button
                onClick={() => handleDelete(confirmDelete.id)}
                className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}