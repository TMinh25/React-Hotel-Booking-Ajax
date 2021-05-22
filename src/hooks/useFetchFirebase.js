import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function useFetchFirebase(firebaseFetchFunction = new Promise(), input = null) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      let isMounted = true;

      firebaseFetchFunction(input)
        .then(data => {
          if (isMounted) {
            setData(data);
            setError(null);
          }
        })
        .catch(err => {
          if (isMounted) {
            setData(null);
            setError(err);
          }
        })
        .finally(() => setIsLoading(false));

      return () => {
        isMounted = false;
      };
    }
  }, [firebaseFetchFunction, input, isLoading]);

  return { isLoading, setIsLoading, data, error };
}

useFetchFirebase.propTypes = {
  firebaseFetchFunction: PropTypes.shape({
    then: PropTypes.func.isRequired,
    catch: PropTypes.func.isRequired,
  }).isRequired,
  input: PropTypes.any,
};

export default useFetchFirebase;
