import Header from './components/Header';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import VideoList from './components/VideoList';
import Video from './components/Video';

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header></Header>
        <VideoList></VideoList>
      </>
    ),
    // children: [
    //   {
    //     path: './details/',
    //     element: (
    //       <Header></Heade
    //     )
    //   }
    // ]
  },
  {
    path: '/result/:search',
    element: (
      <>
        <Header></Header>
        <VideoList></VideoList>
      </>
    ),
  },
  {
    path: '/video/:id',
    element: (
      <>
        <Header></Header>
        <Video></Video>
      </>
    ),
  }
])

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

