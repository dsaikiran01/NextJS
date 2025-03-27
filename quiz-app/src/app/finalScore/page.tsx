'use client'

import { useRouter, useSearchParams } from 'next/navigation';

export default function FinalScore() {
    const router = useRouter();
    const score = useSearchParams().get('score');

    return (
        <main className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">Your</h1>
                <div className="text-4xl font-bold text-blue-600">
                    Final Score is: <span className="text-green-500">{score}</span>
                </div>
                <div className="mt-6">
                    <button
                        onClick={() => router.push('/')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Go Back to Home
                    </button>
                </div>
            </div>
        </main>
    )
}