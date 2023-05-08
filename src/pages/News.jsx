import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Sidebar from '../components/Sidebar';

  const Price = styled.div`
    color: black;
  `
  
  const Container = styled.div`
    flex: 1;
    margin: 5px;
    height: 250px;
    margin-top: 20px;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #f5f5f7;
    
  `;
  
  const Image = styled.img`
    height: 200px;
    width: 300px;
    z-index: 2;
    margin-left: 20px
  `;

  const Unit = styled.div`
    max-width: 80vw;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  `;
  
  const ProductInfo = styled.div`
  flex: 1;
  margin: 5px;
  align-items: center;
  justify-content: center;
  position: relative;
  `
  const Button = styled.button`
display: inline-block;
background-color: #4caf50;
color: white;
padding: 10px 20px;
border: none;
border-radius: 4px;
cursor: pointer;
transition: background-color 0.3s;

&:hover {
    background-color: #d32f2f;
}
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const Dialog = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
`;

const FormButton = styled.button`
  padding: 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0062cc;
  }
`;

function News() {
    const [news, setNews] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [editTitle, setEditTitle] = useState('')
    const [editImage, setEditImage] = useState('')
    const [createdAt, setCreatedAt] = useState()
    const [editForm, setEditForm] = useState(false)


        useEffect(() => {
          fetch('http://localhost:4000/news')
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setNews(response)
            })
        }, [])

        const handleCreateClick = () => {
          setShowForm(true);
        };
      
        const handleFormCancel = () => {
          setShowForm(false);
          setEditForm(false)
        };

        async function handleSubmit(event) {
          try {
            const response = await fetch('http://localhost:4000/news', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ image: image, title: title, createdAt: Date.now()}) // Send the data as a JSON object in the request body
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            const data = await response.json();
          } catch (error) {
            console.error(error);
          }
          setShowForm(false);
        }

        async function handleDelete(id) {
          try {
              const response = await fetch(`http://localhost:4000/news/${id}`, {
                  method: 'DELETE'
              })
  
              if (!response.ok) {
                  throw new Error('Response was not ok')
              }
  
              console.log('Document deleted: ', id);
              window.location.reload();
          } catch(error) {
              console.log(error);
          }
        }

        const handleEditClick = async (id) => {
          try{
            const response = await fetch(`http://localhost:4000/news/${id}`)
            console.log(id);
            console.log(typeof(id));
            const data = await response.json()
            setEditTitle(data.title)
            setEditImage(data.image)
            console.log(editTitle);
            console.log(editImage);
  
          } catch (error) {
            console.log(error);
          }
          setEditForm(true)
        }

        async function handleEdit (id) {
          try {
            const response = await fetch(`http://localhost:4000/news/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ image: image, title: title })
            });
            console.log(response);
        
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
        
            const data = await response.json();
            console.log(data); // Log the updated document
          } catch (error) {
            console.error(error);
          }
        
          setShowForm(false);
        }
        

  return (
    <div>
        <Sidebar />
        <Button onClick={handleCreateClick}>Create +</Button>
        {showForm && (
        <Overlay onClick={handleFormCancel}>
          <Dialog onClick={(event) => event.stopPropagation()}>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                required
                placeholder='Title'
                onChange={(event) => setTitle(event.target.value)}
              />
              <Input
                type="text"
                required
                placeholder='Image'
                onChange={(event) => setImage(event.target.value)}
              />
              <FormButton type="submit">Add</FormButton>
              <FormButton type="button" onClick={handleFormCancel}>
                Cancel
              </FormButton>
            </Form>
          </Dialog>
        </Overlay>
      )}
    <Unit>
        {news.map((item) =>
        <div style={{display: "flex", flexDirection: "row", width: "90%", marginLeft: "auto", marginRight: "auto"}}>
        <Container>
            <Image src={item.image}/>
            <div style={{marginLeft: "5vw"}}>
                <p>{item.title}</p>
        <ProductInfo>
            <Price>{item.createdAt}</Price>
        </ProductInfo>
        <Button onClick={() => handleEditClick(item._id)}>Edit</Button>
        <Button onClick={() => handleDelete(item._id)}>Delete</Button>
        {editForm && (
        <Overlay onClick={handleFormCancel}>
          <Dialog onClick={(event) => event.stopPropagation()}>
            <Form onSubmit={handleEdit}>
              <textarea
                type="text"
                required
                placeholder='Title'
                onChange={(event) => setTitle(event.target.value)}
              />
              <Input
                type="text"
                required
                placeholder='Image'
                onChange={(event) => setImage(event.target.value)}
              />
              <FormButton type="submit">Edit</FormButton>
              <FormButton type="button" onClick={handleFormCancel}>
                Cancel
              </FormButton>
            </Form>
          </Dialog>
        </Overlay>
      )}
          </div>
        </Container>
</div>
            )}
    </Unit>
    </div>
  )
}

export default News