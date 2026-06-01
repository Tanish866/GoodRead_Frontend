import BookImage from 'Assets/Images/images.jpg';
import { AiOutlineUser } from "react-icons/ai";

export default function BookCard({title, Description, Author}){
    return(
        <div className="card card-side h-60 mt-5 bg-base-100 shadow-sm">
            <figure>
                <img
                    src={BookImage}
                    alt="Movie" 
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-white text-xl">{title}</h2>
                <div className='mt-18 flex items-center justify-between'>
                    <div className='flex flex-col gap-3 text-lg text-white'>
                        <div className='flex justify-start gap-5 items-center'>
                            <div>
                                <AiOutlineUser />
                            </div>
                            <div>
                                {Author}
                            </div>
                        </div>
                        <div>
                            {Description}
                        </div>
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">More Details</button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
