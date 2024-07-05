import { format } from "date-fns";

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





      export const createAset = async ({ data, token, path }) => {
        try {
          const formData = new FormData();
          formData.append('asset_code', data.asset_code);
          formData.append('asset_name', data.asset_name);
          formData.append('category_id', data.category_id);
          formData.append('item_condition', data.item_condition);
          formData.append('price', data.price);
          formData.append('received_date', format(data.received_date, 'yyyy-MM-dd'));
          formData.append('expiration_date', format(data.expiration_date, 'yyyy-MM-dd'));
          formData.append('status', data.status);
      
          if (path && path.length > 0) {
              path.forEach((file) => {
              formData.append('path[]', file);
            });
          }
      
          const response = await fetch('http://45.64.99.242:8850/api/aset/create', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: formData,
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

      export const updateAset = async ({ id, token }) => {
        try {
          const response = await fetch(`http://45.64.99.242:8850/api/aset/update/${id}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error('Failed to update Aset');
          }
          return await response.json();
        } catch (error) {
          console.error('Error update Aset:', error);
        }
      };
      

      export const removeAssetData = async ({ id, token }) => {
        try {
          const response = await fetch(`http://45.64.99.242:8850/api/aset/delete/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
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