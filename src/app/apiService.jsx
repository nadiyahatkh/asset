export const fetchApplicant = async ({token}) => {
    try {
        const response = await fetch(`http://45.64.99.242:8850/api/applicant/index`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
        .then((res) => res.json())
        .then((data) => {
         return {
          data: data,
          message: "successs"
         }
        })
        return response.data
      } catch (error) {
        console.error(error);
        return "abs";
      }
    };

    export const removeApplicant = async ({ id, token }) => {
      console.log(id, token)
      try {
        const response = await fetch(`http://45.64.99.242:8850/api/applicant/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            // 'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to remove item Applicant');
        }
        return await response.json();
      } catch (error) {
        console.error('Error removing item Applicant:', error);
      }
    };

    export const fetchDashboard = async ({token}) => {
      try {
          const response = await fetch(`http://45.64.99.242:8850/api/dashboard`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          })
          .then((res) => res.json())
          .then((data) => {
           return {
            data: data,
            message: "successs"
           }
          })
          return response.data
        } catch (error) {
          console.error(error);
          return "abs";
        }
      };

      export const fetchAssetData = async ({token}) => {
        try {
          const response = await fetch('http://45.64.99.242:8850/api/aset/index', {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          })
          .then((res) => res.json())
          .then((data) => {
           return {
            data: data,
            message: "successs"
           }
          })
          return response.data
        } catch (error) {
          console.error(error);
          return "abs"
        }
      }

      export const fetchCategory = async ({token}) => {
        try {
          const response = await fetch('http://45.64.99.242:8850/api/category/index', {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          })
          .then((res) => res.json())
          .then((data) => {
           return {
            data: data,
            message: "successs"
           }
          })
          return response.data
        } catch (error) {
          console.error(error);
          return "abs"
        }
      }





      export const createAset = async ({data, token}) => {
        try {
          const response = await fetch('http://45.64.99.242:8850/api/aset/create', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const result = await response.json();
          return result;
        } catch (error) {
          console.error('Error creating aset:', error);
          throw error;
        }
      };

      export const removeAssetData = async ({ id, token }) => {
        console.log(id, token)
        try {
          const response = await fetch(`http://45.64.99.242:8850/api/aset/delete/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              // 'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Failed to remove item Applicant');
          }
          return await response.json();
        } catch (error) {
          console.error('Error removing item Applicant:', error);
        }
      };

      export const fetchApplicantAdmin = async ({token}) => {
        try {
          const response = await fetch('http://45.64.99.242:8850/api/data/applicant/index', {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          })
          .then((res) => res.json())
          .then((data) => {
           return {
            data: data,
            message: "successs"
           }
          })
          return response.data
        } catch (error) {
          console.error(error);
          return "abs"
        }
      };

      export const fetchApplicantDetail = async ({ token, id }) => {
        try {
          const response = await fetch(`http://45.64.99.242:8850/api/data/applicant/index/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
      
          const data = await response.json();
          return {
            data,
            message: "success"
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      };
      


      export const fetchEmployee = async ({token}) => {
        try {
          const response = await fetch('http://45.64.99.242:8850/api/employee/index', {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          })
          .then((res) => res.json())
          .then((data) => {
           return {
            data: data,
            message: "successs"
           }
          })
          return response.data
        } catch (error) {
          console.error(error);
          return "abs"
        }
      };

      export const removeEmployee = async ({ id, token }) => {
        console.log(id, token)
        try {
          const response = await fetch(`http://45.64.99.242:8850/api/employee/delete/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              // 'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Failed to remove item Applicant');
          }
          return await response.json();
        } catch (error) {
          console.error('Error removing item Applicant:', error);
        }
      };