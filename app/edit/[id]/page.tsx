'use client';

import { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function EditPage() {
    const params = useParams();

    const [formData, setFormData] = useState({ term: "", interpretation: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = params?.id;
                if (!id) {
                    throw new Error("Missing id");
                }
                const response = await fetch(`/api/interpretations/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch interpretation");
                }

                const data = await response.json();
                setFormData({ term: data.term, interpretation: data.interpretation });
            } catch (error) {
                setError("Failed to load interpretation.");
            }
        }

        fetchData();
    }, [params]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        ));

        //console.log(formData); => esse console.log me confirma que esta funciionando o formData
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.term || !formData.interpretation) {
            setError("Please fill in all fields.");
            return;
        }

        setError(null);
        setIsLoading(true);

        try {

            const response = await fetch(`/api/interpretations/${params?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update interpretation');
            }

            router.push('/'); // Redireciona para a página inicial após a criação bem-sucedida
        } catch (error) {

            console.log(error);
            setError("Something went wrong. Please try again.");
        } finally {

            setIsLoading(false);
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold my-8">Edit Interpretaion</h2>

            <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
                <input
                    type="text"
                    name="term"
                    placeholder="Term"
                    value={formData.term}
                    onChange={handleInputChange}
                    className="py-1 px-4 border rounded-md" />

                <textarea
                    name="interpretation"
                    rows={4}
                    placeholder="Interpretation"
                    value={formData.interpretation}
                    onChange={handleInputChange}
                    className="py-1 px-4 border rounded-md resize-none" />

                <button className="bg-black text-white mt-5 px-4 py-1 rounded-md cursor-pointer">
                    {isLoading ? "Updating..." : "Update Interpretation"}
                </button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}