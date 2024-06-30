import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:3030/api/v1";

export const trylogIn = createAsyncThunk("auth/login", async (body: string, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });
        const result = await response.json();
        if (result.error) {
            return rejectWithValue(result.error);
        }
        localStorage.setItem("token", result.token);
        return result;
    } catch (e) {
        return rejectWithValue(e);
    }
});

export const checkLoackalStorage = createAsyncThunk("auth/check", (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (token) {
        return token;
    } else {
        return rejectWithValue("token отсутсвует");
    }
});

export const logOut = createAsyncThunk("auth/logOut", () => {
    localStorage.removeItem("token");
    return;
});

export interface IAuth {
    auth: boolean;
    token?: string;
    loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = { auth: false, loading: "idle" } satisfies IAuth as IAuth;

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(trylogIn.fulfilled, (state, action) => {
                state.auth = true;
                state.token = action.payload.token;
                state.loading = "succeeded";
            })
            .addCase(trylogIn.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(trylogIn.rejected, (state) => {
                state.loading = "failed";
            })
            .addCase(checkLoackalStorage.fulfilled, (state, action) => {
                state.auth = true;
                state.token = action.payload;
                state.loading = "succeeded";
            })
            .addCase(checkLoackalStorage.rejected, (state) => {
                state.auth = false;
                state.token = undefined;
                state.loading = "failed";
            })
            .addCase(logOut.fulfilled, (state) => {
                state.auth = false;
                state.token = undefined;
                state.loading = "failed";
            });
    },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
