import { Controller, Delete, Get, Patch, Post, Req, Res } from '@nestjs/common';
import axios from 'axios';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  COURSE_ENDPOINT = process.env.COURSE_SERVICE_ENDPOINT;
  ENROLLMENT_ENDPOINT = process.env.ENROLLMENT_SERVICE_ENDPOINT;
  PAYMENT_ENDPOINT = process.env.PAYMENT_SERVICE_ENDPOINT;
  NOTIFICATION_ENDPOINT = process.env.NOTIFICATION_ENDPOINT;

  @Get('/api/courses/*')
  async getCourses(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace('/api/courses', 'courses');
      console.log(urlPath);

      const response = await axios.get(`${this.COURSE_ENDPOINT}/${urlPath}`, {
        headers: {
          Authorization: req.headers.authorization,
        },
      });
      return res.status(response.status).send(response.data);
    } catch (error) {
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Course Service Down',
        }),
      });
    }
  }

  @Get('/api/course-content/*')
  async getCourseContent(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace(
        '/api/course-content',
        'course-content',
      );
      console.log(urlPath);

      const response = await axios.get(`${this.COURSE_ENDPOINT}/${urlPath}`, {
        headers: {
          Authorization: req.headers.authorization,
        },
      });
      return res.status(response.status).send(response.data);
    } catch (error) {
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Course Service Down',
        }),
      });
    }
  }

  @Get('/api/course-progression/*')
  async getCourseProgression(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace(
        '/api/course-progression',
        'course-progression',
      );
      console.log(urlPath);

      const response = await axios.get(
        `${this.ENROLLMENT_ENDPOINT}/${urlPath}`,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        },
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      console.log(error);
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Enrollment Service Down',
        }),
      });
    }
  }

  @Get('/api/payments/*')
  async getPayments(@Req() req, @Res() res) {
    try {
      console.log('redirecting to payment service');
      const urlPath = req.originalUrl.replace('/api/payments', 'payments');
      console.log(urlPath);

      const response = await axios.get(`${this.PAYMENT_ENDPOINT}/${urlPath}`, {
        headers: {
          Authorization: req.headers.authorization,
        },
      });
      return res.status(response.status).send(response.data);
    } catch (error) {
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Payment Service Down',
        }),
      });
    }
  }

  @Post('api/text-message-service/*')
  async sendTextMessage(@Req() req, @Res() res) {
    try {
      console.log('redirecting to text message service');
      const urlPath = req.originalUrl.replace(
        '/api/text-message-service',
        'text-message-service',
      );
      console.log(urlPath);

      const response = await axios({
        method: 'post',
        url: `${this.NOTIFICATION_ENDPOINT}/${urlPath}`,
        data: req.body,
        headers: {
          Authorization: req.headers.authorization,
        },
      });

      return res.status(response.status).send(response.data);
    } catch (error) {
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Notificatioin Service Down',
        }),
      });
    }
  }

  @Post('api/email-service/*')
  async sendEmail(@Req() req, @Res() res) {
    try {
      console.log('redirecting to email service');
      const urlPath = req.originalUrl.replace(
        '/api/email-service',
        'email-service',
      );
      console.log(urlPath);

      const response = await axios({
        method: 'post',
        url: `${this.NOTIFICATION_ENDPOINT}/${urlPath}`,
        data: req.body,
        headers: {
          Authorization: req.headers.authorization,
        },
      });

      return res.status(response.status).send(response.data);
    } catch (error) {
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Notification Service Down',
        }),
      });
    }
  }

  @Post('api/courses/*')
  async createCourse(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace('/api/courses', 'courses');
      console.log(urlPath);

      const response = await axios({
        method: 'post',
        url: `${this.COURSE_ENDPOINT}/${urlPath}`,
        data: req.body,
        headers: {
          Authorization: req.headers.authorization,
        },
      });

      return res.status(response.status).send(response.data);
    } catch (error) {
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Course Service Down',
        }),
      });
    }
  }

  @Post('api/course-content/*')
  async createCourseContent(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace(
        '/api/course-content',
        'course-content',
      );
      console.log(urlPath);

      const response = await axios({
        method: 'post',
        url: `${this.COURSE_ENDPOINT}/${urlPath}`,
        data: req.body,
        headers: {
          Authorization: req.headers.authorization,
        },
      });

      return res.status(response.status).send(response.data);
    } catch (error) {
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Course Service Down',
        }),
      });
    }
  }

  @Post('api/course-progression/*')
  async createCourseProgression(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace(
        '/api/course-progression',
        'course-progression',
      );
      console.log(urlPath);

      const response = await axios({
        method: 'post',
        url: `${this.ENROLLMENT_ENDPOINT}/${urlPath}`,
        data: req.body,
        headers: {
          Authorization: req.headers.authorization,
        },
      });

      return res.status(response.status).send(response.data);
    } catch (error) {
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Enrollment Service Down',
        }),
      });
    }
  }

  @Post('api/payments/*')
  async createPayment(@Req() req, @Res() res) {
    try {
      console.log('redirecting to payment service');
      const urlPath = req.originalUrl.replace('/api/payments', 'payments');
      console.log(urlPath);

      const response = await axios({
        method: 'post',
        url: `${this.PAYMENT_ENDPOINT}/${urlPath}`,
        data: req.body,
        headers: {
          Authorization: req.headers.authorization,
        },
      });
      return res.status(response.status).send(response.data);
    } catch (error) {
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Payment Service Down',
        }),
      });
    }
  }

  @Patch('api/courses/*')
  async updateCourse(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace('/api/courses', 'courses');
      console.log(urlPath);

      const response = await axios({
        method: 'patch',
        url: `${this.COURSE_ENDPOINT}/${urlPath}`,
        data: req.body,
        headers: {
          Authorization: req.headers.authorization,
        },
      });

      return res.status(response.status).send(response.data);
    } catch (error) {
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Course Service Down',
        }),
      });
    }
  }

  @Patch('api/course-content/*')
  async updateCourseContent(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace(
        '/api/course-content',
        'course-content',
      );
      console.log(urlPath);

      const response = await axios({
        method: 'patch',
        url: `${this.COURSE_ENDPOINT}/${urlPath}`,
        data: req.body,
        headers: {
          Authorization: req.headers.authorization,
        },
      });

      return res.status(response.status).send(response.data);
    } catch (error) {
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Course Service Down',
        }),
      });
    }
  }

  @Patch('api/course-progression/*')
  async updateCourseProgression(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace(
        '/api/course-progression',
        'course-progression',
      );
      console.log(urlPath);

      const response = await axios({
        method: 'patch',
        url: `${this.ENROLLMENT_ENDPOINT}/${urlPath}`,
        data: req.body,
        headers: {
          Authorization: req.headers.authorization,
        },
      });

      return res.status(response.status).send(response.data);
    } catch (error) {
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Enrollment Service Down',
        }),
      });
    }
  }

  @Patch('api/payments/*')
  async updatePayment(@Req() req, @Res() res) {
    try {
      console.log('redirecting to payment service');
      const urlPath = req.originalUrl.replace('/api/payments', 'payments');
      console.log(urlPath);

      const response = await axios({
        method: 'patch',
        url: `${this.PAYMENT_ENDPOINT}/${urlPath}`,
        data: req.body,
        headers: {
          Authorization: req.headers.authorization,
        },
      });

      return res.status(response.status).send(response.data);
    } catch (error) {
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Payment Service Down',
        }),
      });
    }
  }

  @Delete('api/courses/*')
  async deleteCourse(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace('/api/courses', 'courses');
      console.log(urlPath);

      const response = await axios.delete(
        `${this.COURSE_ENDPOINT}/${urlPath}`,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        },
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Course Service Down',
        }),
      });
    }
  }

  @Delete('api/course-content/*')
  async deleteCourseContent(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace(
        '/api/course-content',
        'course-content',
      );
      console.log(urlPath);

      const response = await axios.delete(
        `${this.COURSE_ENDPOINT}/${urlPath}`,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        },
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Course Service Down',
        }),
      });
    }
  }

  @Delete('api/course-progression/*')
  async deleteCourseProgression(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace(
        '/api/course-progression',
        'course-progression',
      );
      console.log(urlPath);

      const response = await axios.delete(
        `${this.ENROLLMENT_ENDPOINT}/${urlPath}`,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        },
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Enrollment Service Down',
        }),
      });
    }
  }

  @Delete('api/payments/*')
  async deletePayment(@Req() req, @Res() res) {
    try {
      console.log('redirecting to payment service');
      const urlPath = req.originalUrl.replace('/api/payments', 'payments');
      console.log(urlPath);

      const response = await axios.delete(
        `${this.PAYMENT_ENDPOINT}/${urlPath}`,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        },
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Payment Service Down',
        }),
      });
    }
  }
}
