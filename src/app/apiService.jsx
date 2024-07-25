import { format } from "date-fns";

export const fetchApplicant = async ({token, search = '', start_date, end_date, page, per_page}) => {
  try {
      const response = await fetch(`http://45.64.99.242:8850/api/applicant/index?start_date=${start_date}&end_date=${end_date}&search=${search}&page=${page}&per_page=${per_page}`, {
        method: 'GET',
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

  export const fetchDetailApplicantUser = async ({ token, id }) => {
    try {
      const response = await fetch(`http://45.64.99.242:8850/api/applicant/index/${id}`, {
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

  export const selectRemoveApplicant = async ({ ids, token }) => {
      try {
        const response = await fetch(`http://45.64.99.242:8850/api/applicant/destroy`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ids }),
        });
        if (!response.ok) {
          throw new Error('Failed to remove item Applicant');
        }
        return await response.json();
      } catch (error) {
        console.error('Error removing item Applicant:', error);
      }
    };

    export const fetchGetAsetApplicant = async ({token, type}) => {
      try {
        const response = await fetch(`http://45.64.99.242:8850/api/applicant/getaset?type=${type}`, {
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

    export const createApplicantUser = async ({ data, token, path }) => {
      try {
        const formData = new FormData();
        formData.append('asset_id', data.asset_id);
        formData.append('submission_date', format(data.submission_date, 'yyyy-MM-dd'));
        formData.append('expiry_date', format(data.expiry_date, 'yyyy-MM-dd'));
        formData.append('type', data.type);
    
        if (path && path.length > 0) {
            path.forEach((file) => {
            formData.append('path[]', file);
          });
        }
    
        const response = await fetch('http://45.64.99.242:8850/api/applicant/create', {
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
        console.error('Error creating applicant:', error);
        throw error;
      }
    };

    export const updateApplicantUser = async ({ id, data, token, path }) => {
      try {
        const formData = new FormData();
        formData.append('asset_id', data.asset_id);
        formData.append('submission_date', format(data.submission_date, 'yyyy-MM-dd'));
        formData.append('expiry_date', format(data.expiry_date, 'yyyy-MM-dd'));
        formData.append('type', data.type);
    
        if (path && path.length > 0) {
            path.forEach((file) => {
            formData.append('path[]', file);
          });
        }

        const response = await fetch(`http://45.64.99.242:8850/api/applicant/update/${id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });
        if (!response.ok) {
          throw new Error('Failed to update Aset');
        }
        return await response.json();
      } catch (error) {
        console.error('Error update Aset:', error);
      }
    };

    export const fetchApplicantUserId = async ({token, id}) => {
      try {
        const response = await fetch(`http://45.64.99.242:8850/api/applicant/detail/${id}`, {
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

    export const removeApplicant = async ({ id, token }) => {
    
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

      export const updateProfile = async ({ data, token }) => {
        try {
          const formData = new FormData();
          formData.append('username', data.username);
          formData.append('email', data.email);
          formData.append('password', data.password);
          formData.append('password_confirmation', data.password_confirmation);
          if (data.foto) {
            formData.append('foto', data.foto);
        }
      
          
          const response = await fetch(`http://45.64.99.242:8850/api/update`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: formData,
          });
          if (!response.ok) {
            throw new Error('Failed to update Aset');
          }
          return await response.json();
        } catch (error) {
          console.error('Error update Aset:', error);
        }
      };

      export const fetchProfileAdminId = async ({token}) => {
        try {
          const response = await fetch(`http://45.64.99.242:8850/api/detail`, {
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

      export const fetchNavbarProfile = async ({token}) => {
        try {
          const response = await fetch(`http://45.64.99.242:8850/api/navbar/`, {
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

      export const fetchAssetData = async ({ token, search, status, page, per_page, start_date, end_date }) => {
        try {
          const statusParams = status.map(s => `status[]=${s}`).join('&');
      
          const response = await fetch(`http://45.64.99.242:8850/api/aset/index?search=${search}&${statusParams}&start_date=${start_date}&end_date=${end_date}&page=${page}&per_page=${per_page}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          })
          .then((res) => res.json())
          .then((data) => {
            return {
              data: data,
              message: "success"
            }
          })
      
          return response.data;
        } catch (error) {
          console.error(error);
          return "abs";
        }
      }
      

      export const fetchAssetDataId = async ({token, id}) => {
        try {
          const response = await fetch(`http://45.64.99.242:8850/api/aset/detail/${id}`, {
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

      export const updateAset = async ({ id, data, token, path }) => {
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
          if (data.delete_images && data.delete_images.length > 0) {
              data.delete_images.forEach((file) => {
              formData.append('delete_images[]', file);
            });
          }
          const response = await fetch(`http://45.64.99.242:8850/api/aset/update/${id}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: formData,
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

      export const selectRemoveAsset = async ({ ids, token }) => {
        try {
          const response = await fetch(`http://45.64.99.242:8850/api/aset/destroy`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids }),
          });
          if (!response.ok) {
            throw new Error('Failed to remove item Asset');
          }
          return await response.json();
        } catch (error) {
          console.error('Error removing item Asset:', error);
        }
      };

      

      export const fetchApplicantAdmin = async ({token, search, status, type, page, per_page, start_date, end_date}) => {
        const statusParams = status.map(s => `status[]=${s}`).join('&');
        const typeParams = type.map(t => `type[]=${t}`).join('&');
        try {
          const response = await fetch(`http://45.64.99.242:8850/api/data/applicant/index?search=${search}&start_date=${start_date}&end_date=${end_date}&page=${page}&per_page=${per_page}&${statusParams}&${typeParams}`, {
            method: 'GET',
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
      
    export const acceptApplicant = async ({id, token}) => {
        const response = await fetch(`http://45.64.99.242:8850/api/data/applicant/accepted/${id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
      
        if (!response.ok) {
          throw new Error('Failed to accept applicant');
        }
      
        return await response.json();
      };

      export const denyApplicant = async ({id, token}) => {
        const response = await fetch(`http://45.64.99.242:8850/api/data/applicant/denied/${id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
      
        if (!response.ok) {
          throw new Error('Failed to deny applicant');
        }
      
        return await response.json();
      };

      export const selectRemoveSubmission = async ({ ids, token }) => {
        try {
          const response = await fetch(`http://45.64.99.242:8850/api/data/applicant/destroy`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids }),
          });
          if (!response.ok) {
            throw new Error('Failed to remove item Submission');
          }
          return await response.json();
        } catch (error) {
          console.error('Error removing item Submission:', error);
        }
      };


      export const fetchEmployee = async ({token, search, page, per_page}) => {
        try {
          const response = await fetch(`http://45.64.99.242:8850/api/employee/index?page=${page}&per_page=${per_page}&search=${search}`, {
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

      export const selectRemoveEmployee = async ({ ids, token }) => {
        try {
          const response = await fetch(`http://45.64.99.242:8850/api/employee/destroy`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids }),
          });
          if (!response.ok) {
            throw new Error('Failed to remove Employee');
          }
          return await response.json();
        } catch (error) {
          console.error('Error removing Employee:', error);
        }
      };

      export const createEmployee = async ({ data, token }) => {
        console.log(data)
        try {
          const formData = new FormData();
          formData.append('name', data.name);
          formData.append('email', data.email);
          formData.append('password', data.password);
          formData.append('nip', data.nip);
          formData.append('department_id', data.department_id);
          formData.append('position_id', data.position_id);

      
          const response = await fetch('http://45.64.99.242:8850/api/employee/create', {
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

      export const changeEmployees = async ({ id, data, token }) => {
        console.log(data)
        try {
          const formData = new FormData();
          formData.append('name', data.name);
          formData.append('email', data.email);
          formData.append('password', data.password);
          formData.append('nip', data.nip);
          formData.append('department_id', data.department_id);
          formData.append('position_id', data.position_id);

      
          const response = await fetch(`http://45.64.99.242:8850/api/employee/update/${id}`, {
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
          console.error('Error update employee:', error);
          throw error;
        }
      };

      export const fetchDepartement = async ({token}) => {
        try {
          const response = await fetch('http://45.64.99.242:8850/api/department/index', {
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

      export const fetchPosition = async ({token}) => {
        try {
          const response = await fetch('http://45.64.99.242:8850/api/position/index', {
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

      export const fetchEmployeeDataId = async ({token, id}) => {
        try {
          const response = await fetch(`http://45.64.99.242:8850/api/employee/detail/${id}`, {
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