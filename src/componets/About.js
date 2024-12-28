import React ,{useEffect}from 'react';
const About = ({setFilled}) => {
  useEffect(()=>{
    setFilled(40);
    setTimeout(()=>{
      setFilled(50);
    },500)
    setTimeout(()=>{
      setFilled(100);
    }, 1000)
    setFilled(0);
  }, [])
    return (
    <>
        <div className="container">
            <h2 className='title'>About Us</h2>
              <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                      <h2 className="accordion-header">
                          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                              Accordion Item #1
                          </button>
                      </h2>
                      <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                              <strong>This is the first item's accordion body.</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis saepe consequuntur itaque non doloremque iusto, maxime nesciunt praesentium quam rerum, id dignissimos, cumque rem a animi? Maxime ipsam distinctio officia est quasi alias, praesentium, ab ducimus aliquam possimus numquam dicta, doloremque rerum quis totam pariatur odio nesciunt fugiat necessitatibus officiis deleniti? Neque ducimus magni officia aut maiores distinctio quis voluptates facere, ullam accusantium amet! Nam, alias fuga? Minima accusantium veniam deserunt eius sequi corrupti placeat quos, quisquam, libero tempore odit? Ipsam vitae distinctio natus odio?
                          </div>
                      </div>
                  </div>
                  <div className="accordion-item">
                      <h2 className="accordion-header">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                              Accordion Item #2
                          </button>
                      </h2>
                      <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                              <strong>This is the second item's accordion body.</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi exercitationem excepturi inventore dolorem, tempore numquam voluptate repellendus quas cum quam commodi illo fugit. Obcaecati quo fugit, quaerat expedita quos mollitia totam, eum iure sequi facere debitis deserunt repellat dolorem praesentium possimus excepturi unde inventore id, libero placeat. Quos maxime earum dolore iste ad eaque quod ab, inventore assumenda numquam laborum quidem iure repudiandae animi quia non perferendis deserunt sunt. Unde, totam? Esse, quod aliquam corporis quibusdam voluptatem perferendis voluptatibus repudiandae tempore, non consequatur perspiciatis facilis?
                          </div>
                      </div>
                  </div>
                  <div className="accordion-item">
                      <h2 className="accordion-header">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                              Accordion Item #3
                          </button>
                      </h2>
                      <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                              <strong>This is the third item's accordion body.</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, ratione. Vitae saepe sit praesentium vero amet quaerat commodi ipsam cumque eius mollitia officiis delectus labore ipsum ducimus expedita recusandae inventore repudiandae aspernatur placeat sequi, provident tempora odit! Delectus nobis architecto fuga repellat temporibus amet nesciunt ipsa sed ducimus porro, quod voluptas nisi provident? Vitae quae perferendis laudantium rerum, cupiditate omnis minus! Iure perferendis dolorem eos saepe laboriosam consequatur natus quidem dolore. Porro maiores, sunt et repellendus aliquid saepe eaque magnam debitis rem quidem totam suscipit.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default About;
