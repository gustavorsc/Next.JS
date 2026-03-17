import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";


const database = new Databases(client)

//Create Interpretation

async function CreateInterpretation(data: {
    term: string,
    interpretation: string
}) {

    try {
        const respnse = await database.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string
            , "interpretations",
            ID.unique(),
            data
        );

        return respnse;
    } catch (error) {
        console.error("Error creating interpretation:", error);
        throw new Error("Failed to create interpretation");
    }
}

//Fetch Interpretations

async function FetchInterpretations() {

    try {
        const respnse = await database.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string
            , "interpretations",
            [Query.orderDesc("$createdAt")]
        );

        return respnse.documents;
    } catch (error) {
        console.error("Error fetching interpretations:", error);
        throw new Error("Failed to fetch interpretations");
    }
}

//POST function

export async function POST(req: Request) {
    try {

        const { term, interpretation } = await req.json();
        const data = { term, interpretation }
        const response = await CreateInterpretation(data);
        return NextResponse.json({ message: "Interpretation created successfully" })
    } catch (error) {
        return NextResponse.json({ message: "Failed to create interpretation" },
            { status: 500 })
    }
}


//GET  FUNCTION de todos registros no banco de dados
export async function GET() {
    try {

        const interpretations = await FetchInterpretations();
        return NextResponse.json(interpretations);
    } catch (error) {

        return NextResponse.json({ message: "Failed to fetch interpretations" },
            { status: 500 });
    }
}