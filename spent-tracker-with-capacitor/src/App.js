import { useState, useMemo } from "react";
import { appStorage } from "./services/StorageService";
import SpentCard from "./components/SpentCard";
import Header from "./components/Header";
import ErrorMessage from "./components/ErrorMessage";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState(() => {
    return appStorage.getExpenses();
  });
  const [error, setError] = useState(null);

  const handleOnDeleteExpent = (id) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = prevExpenses.filter((expent) => expent.id !== id);
      appStorage.updateExpenses(updatedExpenses);
      return updatedExpenses;
    });
  };

  const handleOnSaveExpent = (e) => {
    e.preventDefault();
    setError(null);
    if (!e.target.subject.value || !e.target.amount.value) {
      setError("You need to fill all fields");
      return;
    }
    const expent = {
      id: Date.now(),
      subject: e.target.subject.value,
      amount: e.target.amount.value,
      date: new Date().toLocaleDateString(),
    };
    e.target.subject.value = "";
    e.target.amount.value = "";
    setExpenses((prevExpenses) => {
      const updatedExpenses = [expent, ...prevExpenses];
      appStorage.updateExpenses(updatedExpenses);
      return updatedExpenses;
    });
  };

  const total = useMemo(() => {
    return expenses.reduce((acc, expent) => acc + parseFloat(expent.amount), 0);
  }, [expenses]);

  return (
    <div className="App">
      <Header />
      <div className="form-container">
        <h2>Add expense</h2>
        <form onSubmit={handleOnSaveExpent}>
          <input type="text" name="subject" placeholder="Subject" />
          <input type="number" step={0.01} name="amount" placeholder="Amout" />
          <div>
            <button type="submit">Add</button>
          </div>
          {error && <ErrorMessage message={error} />}
        </form>
      </div>
      <div className="list-expenses-container">
        {expenses.map((expent) => {
          return (
            <SpentCard
              key={expent.id}
              {...expent}
              onDelete={handleOnDeleteExpent}
            />
          );
        })}
      </div>
      <Footer total={total} />
    </div>
  );
}

export default App;
