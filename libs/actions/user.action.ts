'use server'
import { connectToDatabase } from "../database/mongoose";
import User from "../models/user.model";

export async function createUser(user:CreateUserParams){
  try{
    await connectToDatabase()
    const createUser = await User.create(user)
    return JSON.parse(JSON.stringify(createUser)) 
  }
  catch(error){
    console.log(error)
  }
}

export async function getUserById(clerkId:String){
  try{
    await connectToDatabase()
    const readUser = await User.findOne({clerkId})
    if(!readUser) throw new Error("User not found")
    return JSON.parse(JSON.stringify(readUser)) 
  }
  catch(error){
    console.log(error)
  }
}

export async function UpdateUser(clerkId:String,user:CreateUserParams){
  try{
    await connectToDatabase()
    const updateUser = await User.findOneAndUpdate({clerkId},user,{new:true})
    if(!updateUser) throw new Error("User not found")
    return JSON.parse(JSON.stringify(updateUser))
  }
  catch(error){
    console.log(error)
  }
}

export async function deleteUser(clerkId:String){
  try{
    await connectToDatabase()
    const user = await User.findOne({clerkId})
    if(!user) throw new Error('User not found')
    const deleteUser = await User.findByIdAndDelete(user)
    return deleteUser?JSON.parse(JSON.stringify(deleteUser)):null
  }
  catch(error){
    console.log(error)
  }
}