//  it is the  entry point of the project , so it contains database connection and port setup functions

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from.env file

dotenv.config({

    path: "./.env",
    
    });
import { app } from "./app.js";

import connectDB from "./db/index.js";
// Connect to MongoDB

