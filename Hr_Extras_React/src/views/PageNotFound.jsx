import React from 'react'
import storage from '../storage/storage';


export const PageNotFound = () => {

    const userPermissions = storage.get('permisos'); 

    return (
        <div class="row ">
            <div class="col-sm-12">
                <div class="card-body">
                    <div class="error-image-block NotFound "><img class="img-fluid" src="src/assets/images/pages/img-error-404.svg" alt="img" /></div>
                    <div class="text-center">
                        <h1 class="mt-5"><b>Page Not Found</b></h1>
                        <p class="mt-2 mb-4 text-muted">The page you are looking was moved, removed,<br />renamed, or might never exist!</p>
                        <a href={"/"+userPermissions[0].name} class="btn btn-primary mb-3">Ir al Inicio</a>
                    </div>
                </div>
            </div>
        </div>

    )
}

