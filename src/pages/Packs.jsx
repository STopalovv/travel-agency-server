import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Sidebar from '../components/Sidebar'

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
justify-content: space-between;
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
margin-bottom: 20px;
&:hover {
    background-color: #d32f2f;
}
`
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

function Packs() {
    const [showForm, setShowForm] = useState(false);
    const [packs, setPacks] = useState([])
    const [image, setImage] = useState('')
    const [destination, setDestination] = useState('')
    const [start, setStart] = useState('')
    const [price, setPrice] = useState(0)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [stayingPlace, setStayingPlace] = useState('')
    const [numberOfPacks, setnumberOfPacks] = useState(0)

    const [editForm, setEditForm] = useState(false);
    const [editImage, setEditImage] = useState('')
    const [editDestination, setEditDestination] = useState('')
    const [editStart, setEditStart] = useState('')
    const [editPrice, setEditPrice] = useState(0)
    const [editStartDate, setEditStartDate] = useState('')
    const [editEndDate, setEditEndDate] = useState('')
    const [editStayingPlace, setEditStayingPlace] = useState('')
    const [editNumberOfPacks, setEditnumberOfPacks] = useState(0)

    useEffect(() => {
      fetch('http://localhost:4000/packs')
        .then(response => response.json())
        .then(response => {
            setPacks(response)
            console.log(response);
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
          const response = await fetch('http://localhost:4000/packs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: image, destination: destination, start: start, price: price, startDate: startDate, endDate: endDate, stayingPlace: stayingPlace, numberOfPacks: numberOfPacks }) // Send the data as a JSON object in the request body
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          console.log(data); // Log the new document that was created
          console.log(destination);
        } catch (error) {
          console.error(error);
        }
        setShowForm(false);
      }

      async function handleDelete(id) {
        try {
            const response = await fetch(`http://localhost:4000/packs/${id}`, {
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
        setEditForm(true)
        try{
          const response = await fetch(`http://localhost:4000/packs/${id}`)
          const data = await response.json()
          setEditDestination(data.destination)
          setEditPrice(data.price)
          setEditImage(data.image)
          setEditStart(data.start)
          setEditStartDate(data.startDate)
          setEditEndDate(data.endDate)
          setEditStayingPlace(data.stayingPlace)
          setEditnumberOfPacks(data.numberOfPacks)

        } catch (error) {
          console.log(error);
        }
      }

      async function handleEdit(id) {
        try {
          const response = await fetch(`http://localhost:4000/packs/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: image, destination: destination, start: start, price: price, startDate: startDate, endDate: endDate, stayingPlace: stayingPlace, numberOfPacks: numberOfPacks })
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();
          console.log(data); // Log the updated document
          console.log(destination);
        } catch (error) {
          console.error(error);
        }
      
        setShowForm(false);
      }
    

return (
<div>
    <Sidebar />
    <div>
      <Button onClick={handleCreateClick}>Добави +</Button>
      {showForm && (
        <Overlay onClick={handleFormCancel}>
          <Dialog onClick={(event) => event.stopPropagation()}>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                required
                placeholder='Дестинация'
                onChange={(event) => setDestination(event.target.value)}
              />
              <Input
                type="text"
                required
                placeholder='Снимка'
                onChange={(event) => setImage(event.target.value)}
              />
              <Input
                type="text"
                required
                placeholder='Тръгване от'
                onChange={(event) => setStart(event.target.value)}
              />
              <Input
                type="number"
                required
                placeholder='Цена'
                onChange={(event) => setPrice(event.target.value)}
              />
              <Input
                type="date"
                required
                placeholder='Начало'
                onChange={(event) => setStartDate(event.target.value)}
              />
              <Input
                type="date"
                required
                placeholder='Край'
                onChange={(event) => setEndDate(event.target.value)}
              />
              <Input
                type="text"
                required
                placeholder='Нощувка'
                onChange={(event) => setStayingPlace(event.target.value)}
              />
              <Input
                type="number"
                required
                placeholder='Брой пакети'
                onChange={(event) => setnumberOfPacks(event.target.value)}
              />
              <FormButton type="submit">Add</FormButton>
              <FormButton type="button" onClick={handleFormCancel}>
                Откажи
              </FormButton>
            </Form>
          </Dialog>
        </Overlay>
      )}
    </div>
<Unit>
    {packs.map((item) =>
    <div style={{display: "flex", flexDirection: "row", width: "90%", marginLeft: "auto", marginRight: "auto"}}>
    <Container key={item._id}>
        <Image src={item.image}/>
        <div style={{marginLeft: "5vw"}}>
            <p>{item.destination}</p>
    <ProductInfo>
        <Price>Оставащи пакети: {item.numberOfPacks}</Price>
    </ProductInfo>
        </div>
        <div>
            <Button style={{marginRight: "15px"}} onClick={() => handleEditClick(item._id)}>Актуализация</Button>
            <Button style={{marginRight: "15px"}} onClick={() => handleDelete(item._id)}>Изтриване</Button>
        </div>
        {editForm && (
        <Overlay onClick={handleFormCancel}>
          <Dialog onClick={(event) => event.stopPropagation()}>
            <Form onSubmit={handleEdit}>
              <Input
                type="text"
                value={editDestination}
                placeholder='Дестинация'
                onChange={(event) => setDestination(event.target.value)}
              />
              <Input
                type="text"
                value={editImage}
                placeholder='Снимка'
                onChange={(event) => setImage(event.target.value)}
              />
              <Input
                type="text"
                value={editStart}
                placeholder='Тръгване от'
                onChange={(event) => setStart(event.target.value)}
              />
              <Input
                type="number"
                value={editPrice}
                placeholder='Цена'
                onChange={(event) => setPrice(event.target.value)}
              />
              <Input
                type="date"
                value={editStartDate}
                placeholder='Начало'
                onChange={(event) => setStartDate(event.target.value)}
              />
              <Input
                type="date"
                value={editEndDate}
                placeholder='Край'
                onChange={(event) => setEndDate(event.target.value)}
              />
              <Input
                type="text"
                value={editStayingPlace}
                placeholder='Нощувка'
                onChange={(event) => setStayingPlace(event.target.value)}
              />
              <Input
                type="number"
                value={editNumberOfPacks}
                placeholder='Брой пакети'
                onChange={(event) => setnumberOfPacks(event.target.value)}
              />
              <FormButton type="submit">Актуализация</FormButton>
              <FormButton type="button" onClick={handleFormCancel}>
                Откажи
              </FormButton>
            </Form>
          </Dialog>
        </Overlay>
      )}
    </Container>
</div>
        )}
</Unit>
</div>
)
}

export default Packs