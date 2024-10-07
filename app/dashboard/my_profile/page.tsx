// "use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/requireUser";
import ProfileForm from "@/components/Dashboard/forms/ProfileForm";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";



export default async function MyProfilePage() {
    const {getUser} = getKindeServerSession();
const myuser = await getUser();

console.log(myuser);
  const user = await requireUser();
  console.log(user);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
        My Profile
      </h1>
      <p>{user.properties?.usr_author_name} hi</p>
      
      {/* <form className="space-y-4">
        <div>
          <Label className="block text-sm font-medium text-primary">
            Preferred AuthorName
          </Label>
          <p className="text-sm text-gray-500">This is the name that will be used for your writer profile</p>
          <Input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter your preferred name"
            value={user.given_name || ""}
            readOnly
          />
        </div>
        <div>
          <label
            htmlFor="profilePic"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Picture
          </label>
          <div className="mt-1 flex items-center">
            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
              <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <button
              type="button"
              className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Change
            </button>
          </div>
        </div>
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <div className="mt-1">
            <textarea
              id="bio"
              name="bio"
              rows={3}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              placeholder="Write a short bio about yourself"
            ></textarea>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </form> */}
      <ProfileForm
        user={{
          given_name: user.given_name || "",
          username: user.username || "",
          author_name: user.properties?.author_name || "",
        }}
      />
    </div>
  );
}
