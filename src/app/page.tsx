'use client'

import React from 'react'
import { useMemo, useState, useEffect } from 'react';

interface User { 
  user_id : number 
  email: string;
  password: string;
  username: string;
  role: 'Dosen' | 'Tim SPSS' ; 
  created_at : string ;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async (): Promise<void> => { 
    try { 
      setLoading(true);
      const res = await fetch('/api/users'); 
      
      if (!res.ok) { 
        throw new Error('Failed to fetch users'); 
      }
      const data :User = await res.json();
      if (data != null && Array.isArray(data)) {
        setUsers(data); 
      } else { 
        console.error('Invalid data format received');
      }
    }
    catch (error) { 
      if (error instanceof Error) {
        console.error('Error fetching users:', error.message);
      }
    }
    finally { 
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container"> 
      <nav className="py-4 shadow-md mb-8"> 
        <div className="container mx-auto flex justify-center items-center">
          <h1 className="text-2xl font-bold text-white tracking-widest">
            Demo App
          </h1>
        </div>
      </nav>

      <section className="w-full py-5 mb-4 shadow-md">
        <div className="carousel "></div>
      </section>

    <div>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.user_id}>
              <p>Email: {user.email}</p>
              <p>Username: {user.username}</p>
              <p>Role: {user.role}</p>
              <p>Created At: {user.created_at}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div> 
  )
}

export default App
