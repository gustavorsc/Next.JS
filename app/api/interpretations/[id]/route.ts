import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client)

// Fetch a specific interpretation by ID
//GET function by ID

async function FetchInterpretation(id: string) {
    try {

        const interpretation = await database.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "interpretations",
            id
        );

        return interpretation;
    } catch (error) {
        console.error("Error fetching interpretation:", error);
        throw new Error("Failed to fetch interpretation");
    }
}

//DELETE a specific interpretation by ID

async function DeleteInterpretation(id: string) {
    try {

        const response = await database.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "interpretations",
            id
        );

        return response;
    } catch (error) {

        console.error("Error deleting interpretation:", error);
        throw new Error("Failed to delete interpretation");
    }
}


//UPDATE a specific interpretation by ID

async function UpdateInterpretation(id: string, data: {
    term: string,
    interpretation: string
}) {

    try {

        const response = await database.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "interpretations",
            id,
            data
        );

        return response;
    } catch (error) {

        console.error("Error Updating interpretation:", error);
        throw new Error("Failed to update interpretation");
    }
}

//Criando as functions 


//GET FUNCTION by ID
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> | { id: string } }
) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: "Missing interpretation id" }, { status: 400 });
        }

        const interpretation = await FetchInterpretation(id);
        return NextResponse.json(interpretation);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch interpretation" }, { status: 500 });
    }
}

//DELETE FUNCTION by ID
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> | { id: string } }
) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: "Missing interpretation id" }, { status: 400 });
        }

        await DeleteInterpretation(id);
        return NextResponse.json({ message: "interpretation deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete interpretation" }, { status: 500 });
    }
}

//PUT/POST FUNCTION by ID
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> | { id: string } }
) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: "Missing interpretation id" }, { status: 400 });
        }

        const interpretation = await req.json();
        await UpdateInterpretation(id, interpretation);
        return NextResponse.json({ message: "interpretation updated" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update interpretation" }, { status: 500 });
    }
}