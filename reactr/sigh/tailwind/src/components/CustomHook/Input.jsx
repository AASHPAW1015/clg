import { useLocalStorage } from './UseLocalStorage.jsx'

const Input = () => {
  const [name, setName] = useLocalStorage("userName", "");
  const [cohort, setCohort] = useLocalStorage("userCohort", "");
  
  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={cohort}
        onChange={(e) => setCohort(e.target.value)}
        placeholder="Cohort"
      />
    </div>
  )
}

export default Input
