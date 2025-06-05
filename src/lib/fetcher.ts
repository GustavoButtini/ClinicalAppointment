import useSWR from 'swr';

const fetcher = async (url: string) =>
  await fetch(url).then((res) => res.json());
export const usePatients = (clinicId: string) => {
  const { data, error, isLoading } = useSWR(
    '/api/clinic/' + clinicId + '/patients',
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  );
  return {
    allPatients: data ?? [],
    isLoadingPatients: isLoading,
    isErrorPatients: !!error,
  };
};
export const useDoctors = (clinicId: string) => {
  const { data, error, isLoading } = useSWR(
    '/api/clinic/' + clinicId + '/doctors',
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  );
  return {
    allDoctors: data ?? [],
    isLoadingDocs: isLoading,
    isErrorDocs: !!error,
  };
};
