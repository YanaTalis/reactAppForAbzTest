import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react'
import CardPerson from './../card/CardPerson'
import Button from '../button/Button'
import { getUsers } from '../../api/apiService'
import Loader from '../loader/Loader'
import styles from './GetSection.module.scss'

// GetSection component with API
const GetSection = forwardRef((props, ref) => {
  // States for showing API data
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const sectionRef = useRef(null)

  // Expose refreshUsers function to parent component
  useImperativeHandle(ref, () => ({
    refreshUsers: () => {
      loadUsers(1, true)
    },
    scrollTo: () => {
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    },
  }))
  const [page, setPage] = useState(1)

  // Load users on first render
  useEffect(() => {
    loadUsers(1, true) // true -> replase data
  }, [])

  // Function to load users from server
  const loadUsers = async (pageNumber, replace = false) => {
    setLoading(true)
    setError(null)

    try {
      const data = await getUsers(pageNumber, 6)

      if (data.success) {
        let newUsers = data.users

        // Sort users by registration date to do newest first
        newUsers = newUsers.sort((a, b) => {
          return b.registration_timestamp - a.registration_timestamp
        })

        // replace first data or add new data
        if (replace) {
          setUsers(newUsers)
        } else {
          setUsers((prevUsers) => [...prevUsers, ...newUsers])
        }

        setPage(pageNumber)

        // Check if there are more pages
        setHasMore(pageNumber < data.total_pages)
      } else {
        setError('Error loading users')
        console.error('API doesnt returned success')
      }
    } catch (err) {
      setError('Error loading users: ' + err.message)
      console.error('Error loading users:', err)
    } finally {
      setLoading(false)
    }
  }

  // Handler for btn Show more
  const handleShowMore = () => {
    const nextPage = page + 1
    loadUsers(nextPage, false) // false -> add new data
  }

  // Show error message
  if (error) {
    return (
      <section className={styles.get}>
        <div className="container">
          <h2 className={styles['get__title']}>Working with GET request</h2>
          <div style={{ textAlign: 'center', color: 'red', padding: '20px' }}>
            <p>{error}</p>
            <Button variant="primary" onClick={() => loadUsers(1, true)}>
              Try again
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.get} ref={sectionRef}>
      <div className="container">
        <h2 className={styles['get__title']}>Working with GET request</h2>

        {/* Display users from API */}
        <div className={styles['get__list']}>
          {users.map((user) => (
            <CardPerson
              key={user.id}
              photo={user.photo}
              name={user.name}
              position={user.position}
              email={user.email}
              phone={user.phone}
            />
          ))}
        </div>
        {loading && (
          <div style={{ paddingTop: 40 }}>
            <Loader />
          </div>
        )}

        {/* Show button if there are more users */}
        {hasMore && !loading && (
          <div className={styles['get__button-wrapper']}>
            <Button
              variant="primary"
              onClick={handleShowMore}
              className={styles['get__show-more-btn']}
            >
              Show more
            </Button>
          </div>
        )}

        {/* Show message when no more data */}
        {!hasMore && users.length > 0 && !loading && (
          <div
            style={{ textAlign: 'center', padding: '20px', color: '#7e7e7e' }}
          >
            <p>No more users available</p>
          </div>
        )}
      </div>
    </section>
  )
})

export default GetSection
