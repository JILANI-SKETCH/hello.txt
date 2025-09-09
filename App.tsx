import React, { useState, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import { Student, StudentFormData } from './types/Student';
import { StudentForm } from './components/StudentForm';
import { StudentList } from './components/StudentList';
import { getStudents, addStudent, updateStudent, deleteStudent } from './utils/storage';

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  useEffect(() => {
    setStudents(getStudents());
  }, []);

  const handleAddStudent = (data: StudentFormData) => {
    const newStudent = addStudent(data);
    setStudents(prev => [...prev, newStudent]);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
  };

  const handleUpdateStudent = (data: StudentFormData) => {
    if (editingStudent) {
      const success = updateStudent(editingStudent.id, data);
      if (success) {
        setStudents(getStudents());
        setEditingStudent(null);
      }
    }
  };

  const handleDeleteStudent = (id: string) => {
    const success = deleteStudent(id);
    if (success) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Student Management System</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Efficiently manage student records with our comprehensive system. Add, edit, and organize student information with ease.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Form Section */}
          <StudentForm
            onSubmit={editingStudent ? handleUpdateStudent : handleAddStudent}
            onCancel={editingStudent ? handleCancelEdit : undefined}
            initialData={editingStudent || undefined}
            isEditing={!!editingStudent}
          />

          {/* List Section */}
          <StudentList
            students={students}
            onEdit={handleEditStudent}
            onDelete={handleDeleteStudent}
          />
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;