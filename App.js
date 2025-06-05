import React, { useState, useEffect } from 'react'; 
import BookList from './components/BookList'; 
import BookForm from './components/BookForm'; 
import "./components/Form.css";
 
function App() { 
  const [books, setBooks] = useState([]); 
  const [editingBook, setEditingBook] = useState(null); 

  useEffect(() => { 
    const stored = localStorage.getItem('books'); 
    if (stored) { 
      setBooks(JSON.parse(stored)); 
    } 
  }, []);

  useEffect(() => { 
    localStorage.setItem('books', JSON.stringify(books)); 
  }, [books]); 
 
  const handleAddBook = (newBook) => { 
    setBooks([...books, newBook]); 
  }; 
  
  const handleUpdateBook = (updatedBook) => { 
    const newList = books.map(b =>  
      b.id === updatedBook.id ? updatedBook : b 
    ); 
    setBooks(newList); 
    setEditingBook(null); 
  }; 

  const handleDeleteBook = (id) => { 
    const newList = books.filter(b => b.id !== id); 
    setBooks(newList); 
  }; 

  const handleEditClick = (book) => { 
    setEditingBook(book); 
  }; 

  return ( 
    <div style={{ margin: '20px' }}> 
      <h1>Quản Lý Sách</h1> 
      <BookForm  
        onAdd={handleAddBook}  
        onUpdate={handleUpdateBook} 
        editingBook={editingBook} 
      /> 
      <BookList  
        books={books} 
        onEdit={handleEditClick} 
        onDelete={handleDeleteBook}
      /> 
    </div> 
  ); 
}  
 
export default App;
